import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUsers from '../../../../hooks/useUsers';
import useAuth from '../../../../hooks/useAuth';



const AllUsers = () => {
    const { user: self } = useAuth()
    const { users, isLoading, refetch } = useUsers();
    const axiosSecure = useAxiosSecure();
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${user.name} has been deleted.`,
                                icon: "success"
                            });

                        }
                    }
                    )

            }
        });
    }
    const handleMakeAdmin = user => {

        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        title: "Updated!",
                        text: `${user.name} is Admin now!`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            }
            )

    }


    return (
        <div>
            <div className='flex justify-evenly'>
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-8 rounded">
                                            <img src={user.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? "Admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-lg bg-orange-500"><FaUsers className="text-white text-2xl"></FaUsers></button>
                                    }
                                </td>
                                <td>
                                    <button
                                        disabled={self?.email === user.email}
                                        onClick={() => handleDeleteUser(user)}
                                        className={`btn btn-ghost btn-lg ${self?.email === user.email ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600'
                                            }`}
                                    >
                                        <FaTrashAlt className="text-white" />
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;