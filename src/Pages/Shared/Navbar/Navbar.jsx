import { Link, Outlet } from "react-router-dom";
import logo from '../../../assets/logo.png';
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
const Navbar = () => {
    const {user,logOut} = useAuth();
    const handleLogOut = () => {
      logOut()
        .then(() => {
          Swal.fire({
            position: "top-end",
            title: "Successfully Sign Out!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });
        })
        .catch(error => console.log(error))
    }
    const navoptions=<>
      <li className=""><Link to="/">Home</Link></li>
      <li className=""><Link to="/allClasses">All Classes</Link></li>
      <li className=""><Link to="/teachOn">Teach On <span className="font-serif font-semibold text-blue-600">The Master!</span></Link></li>  
      {
        user?<>
        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user?.photoURL}/>
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box max-w-fit">
        <li className=" p-2 pointer-events-none">          
            {
               user?.displayName
            }
          
        </li>
        <li><Link to='/dashboard/myprofile'>Dashboard</Link></li>
        <li onClick={handleLogOut}><Link>Logout</Link></li>
      </ul>
    </div>
        </>:<ul><li className=""><Link to="/signin">Sign In</Link></li></ul>
      }
      

    </>
    return (
        <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="w-full navbar">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2">
        
        <Link to='/'><div className="flex flex-row"><img src={logo} className="w-8 mr-2" alt="logo" /><h2 className="font-extrabold text-blue-600 text-3xl ">The Master</h2></div></Link></div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          {
            navoptions
          }
        </ul>
      </div>
    </div>
    {/* Page content here */}
    <Outlet></Outlet>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
    {
        navoptions
    }
    </ul>
  </div>
</div>
    );
};

export default Navbar;