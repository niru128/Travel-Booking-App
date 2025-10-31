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
    
    <div className="pt-5 mt-10 px-[124px] pb-10 flex flex-col items-center gap-4">
      <img src="/Vector1.png" alt="success!" className="w-[70px] h-[70px] mb-6" />
      <p className="font-medium text-[32px] leading-10 font-inter tracking-normal text-[#161616]">Booking Confirmed</p>
      <p className="font-normal text-[20px] leading-6 tracking-normal text-[#656565] font-inter">Ref ID: {booking.bookingId}</p>
      <button className="bg-gray-200 px-4 py-2 gap-2.5 rounded-sm font-medium text-[#656565] leading-5 tracking-normal text-[16px] mt-4 cursor-pointer hover:bg-gray-300" onClick={handleClick}>Back to Home</button>
    </div>


  )
}

export default BookingConfirmed
