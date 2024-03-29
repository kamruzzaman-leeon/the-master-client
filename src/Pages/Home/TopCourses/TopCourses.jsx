import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import CourseCard from '../../../components/CourseCard/CourseCard';
import useClasses from '../../../hooks/useClasses';
import Loading from '../../../components/Loading/Loading';


const TopCourses = () => {
  const { isLoading, classes, refetch } = useClasses();
  // console.log('topcourse', classes)
  if (isLoading) {
    return <Loading></Loading>
  }
  const approvedClasses = classes.filter(classitem => classitem.status === 'approve');
  // console.log(classes)
  approvedClasses.sort((a, b) => parseInt(a.enrolment, 10) - parseInt(b.age, 10))
  return (
    <div className='mx-5 my-10'>
      <h2 className='text-center font-bold text-4xl py-5'>Our Top enrollment courses</h2>
      <p className='font-bold text-xl mx-5 mb-5 text-center text-slate-600'>Explore free online courses from the world&apos;s top universities and companies.</p>

      <Swiper
      
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >

        {
          approvedClasses.map(
            classitem => <SwiperSlide key={classitem._id}><CourseCard classitems={classitem}></CourseCard></SwiperSlide>
          )
        }
      </Swiper>
      </div>

  );
};

export default TopCourses;