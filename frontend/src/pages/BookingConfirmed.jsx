import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const BookingConfirmed = () => {

  const { state } = useLocation();
  const booking = state?.booking;
  const navigate = useNavigate();

  if (!booking) {
    return <div>No booking data available.</div>
  }

  const handleClick = ()=>{
    navigate('/');
  }
  return (
    
    <div className="pt-5 mt-10 px-4 sm:px-8 md:px-16 lg:px-[124px] pb-10 flex flex-col items-center gap-4 text-center">
  <img
    src="/Vector1.png"
    alt="success!"
    className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] mb-4 sm:mb-6"
  />
  <p className="font-medium text-[22px] sm:text-[28px] md:text-[32px] leading-8 sm:leading-9 md:leading-10 font-inter tracking-normal text-[#161616]">
    Booking Confirmed
  </p>
  <p className="font-normal text-[16px] sm:text-[18px] md:text-[20px] leading-5 sm:leading-6 tracking-normal text-[#656565] font-inter">
    Ref ID: {booking.bookingId}
  </p>
  <button
    className="bg-gray-200 px-4 sm:px-5 py-2 sm:py-2.5 gap-2.5 rounded-sm font-medium text-[#656565] leading-5 tracking-normal text-[14px] sm:text-[16px] mt-4 cursor-pointer hover:bg-gray-300"
    onClick={handleClick}
  >
    Back to Home
  </button>
</div>



  )
}

export default BookingConfirmed
