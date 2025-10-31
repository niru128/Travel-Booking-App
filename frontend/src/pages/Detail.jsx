import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api.js'

const Detail = () => { 
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [people, setPeople] = useState(1);
  const [leftCounts, setLeftCounts] = useState([]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time first!");
      return;
    }
    console.log("Experience object before navigating:", experience);

    // Create booking data object
    const bookingData = {
      experience: experience.title,
      experienceId: experience._id,
      date: selectedDate,
      time: selectedTime,
      people,
      pricePerPerson: experience.pricePerPerson,
    };

    // 🔹 Save to localStorage so data survives refresh
    localStorage.setItem("checkoutData", JSON.stringify(bookingData));

    // 🔹 Navigate using experienceId in the URL
    navigate(`/checkout/${experience._id}`);
  };

  useEffect(() => {
    if (experience && experience.availableSlots[0]?.times) {
      const counts = experience.availableSlots[0].times.map(() => Math.floor(Math.random() * 5) + 1 );
      setLeftCounts(counts);
    }
  }, [experience]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await api.get(`/experiences/${id}`);
        setExperience(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching experience details:", error);
        setLoading(false);
      }
    }
    fetchExperience();
  }, [id]);

  const handleBack = ()=>{
    navigate(-1);
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!experience) {
    return <div>Error loading experience details.</div>
  }

  return (
    <div className='pt-5 px-[124px] pb-10 flex flex-col gap-4'>
      <button className='cursor-pointer hover:text-blue-950 flex flex-row gap-2 items-center' onClick={handleBack} >
        <img src='/Vector.png' className='w-[12.99px] h-[12.65px] top-[3.67px] left-[3.68px]' />
        <p>Detail</p>
      </button>

      {/* main layout */}
      <div className='flex flex-row gap-4 '>
        <div className='flex-1'>
          <img src={experience.image} alt={experience.title} className='w-[765px] h-[381px] top-[155px] left-[124px] rounded-xl' />
          <div className='flex flex-col gap-4 mt-8 '>
            <div className='w-[765px] h-24 gap-4 flex flex-col'>
              <h1 className='font-inter font-medium leading-8 text-[24px] text-[#161616]'>{experience.title}</h1>
              <p className='font-medium font-inter text-[16px] leading-6 text-[#6C6C6C]'>{experience.description}</p>
            </div>

            <div className='flex flex-col gap-6 w-[765px] h-[278px]'>
              <div className='w-[412px] h-[68px] gap-3 flex flex-col'>
                <h2 className='font-inter font-medium text-[18px] leading-[22px] text-[#161616]'>Choose Date </h2>
                <div className="flex gap-2 w-[440px]">
                  {experience.availableSlots.map((slot, index) => (
                    <div key={index} >
                      <button key={index} onClick={() => setSelectedDate(slot.date)} className={`px-3 text-[#161616] py-2 border-[0.6px] rounded-sm h-[34px] w-[79px] font-medium text-[14px] leading-[18px] grow cursor-pointer ${selectedDate === slot.date ? "bg-[#FFD643] text-[#161616] border-[#FF4C0A]" : "bg-[#FFFFFF] text-[#161616] border-gray-300"}`} >
                        {slot.date}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-lg h-24">
                <h2 className="font-inter font-medium text-[18px] leading-[22px] text-[#161616]"> Choose Time </h2>
                <div className="flex gap-2 w-lg h-[34px] flex-row justify-evenly">
                  {experience.availableSlots[0].times.map((timeObj, i) => {
                    const isSoldOut = timeObj.status === "soldOut";
                    // optional
                    return (
                      <button key={i} disabled={isSoldOut} onClick={() => setSelectedTime(timeObj.time)} className={`px-3 py-2 border-[0.6px] rounded-sm h-[34px] w-[69px] font-medium text-[14px] leading-[18px] grow cursor-pointer ${isSoldOut ? "bg-[#CCCCCC] text-[#838383] cursor-not-allowed" : selectedTime === timeObj.time ? "bg-[#FFD643]" : "bg-[#FFFFFF] text-[#838383]"}`} >
                        {timeObj.time}
                        <span className="text-[#FF4C0A] text-[10px] ml-[5px] leading-[18px]">
                          {isSoldOut ? "Sold out" : `${leftCounts[i] ?? 0} left`}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="h-4 w-lg font-medium font-inter text-[12px] leading-4 text-[#838383]"> All times are in IST (GMT +5:30) </div>
              </div>

              <div className='w-[765px] h-[66px] gap-2 flex flex-col'>
                <p className='font-medium text-[18px] leading-[22px] text-[#161616]'>About</p>
                <p className='py-3 px-4 gap-2.5 font-medium font-inter h-8 w-[765px] text-[#838383]'>Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[155px] left-[929px] w-[387px] h-[303px] bg-[#EFEFEF] rounded-xl p-6 space-y-6">
          <div className="flex flex-col w-[339px] h-[187px] gap-4">
            {/* Price header */}
            <div className="flex justify-between items-center">
              <p className="text-[#6C6C6C] text-[14px]">Starts at</p>
              <p className="font-semibold text-[18px] text-[#161616]">₹{experience.pricePerPerson}</p>
            </div>

            
            <div className="flex justify-between items-center">
              <p className="text-[#6C6C6C] text-[14px]">Quantity</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPeople(prev => Math.max(1, prev - 1))} className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium hover:bg-gray-100" >
                  –
                </button>
                <p className="w-8 text-center text-[#161616]">{people}</p>
                <button onClick={() => setPeople(prev => prev + 1)} className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium hover:bg-gray-100" >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <p className="text-[#6C6C6C] text-[14px]">Subtotal</p>
              <p className="text-[#161616] font-medium text-[14px]">
                ₹{experience.pricePerPerson * people}
              </p>
            </div>

            {/* Taxes (6%) */}
            <div className="flex justify-between items-center border-b pb-3">
              <p className="text-[#6C6C6C] text-[14px]">Taxes</p>
              <p className="text-[#161616] font-medium text-[14px]">₹{Math.round(experience.pricePerPerson * people * 0.06)}</p>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[16px] text-[#161616]">Total</p>
              <p className="font-semibold text-[16px] text-[#161616]">
                ₹{(experience.pricePerPerson * people + Math.round(experience.pricePerPerson * people * 0.06)).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Confirm Button */}
          <button onClick={handleBooking} disabled={!selectedDate || !selectedTime} className={`w-[339px] h-11 px-5 py-3 rounded-lg font-semibold transition ${selectedDate && selectedTime ? "bg-[#FFD643] text-[#161616] hover:bg-amber-300 cursor-pointer" : "bg-gray-300 text-[#161616] cursor-not-allowed"}`} >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
export default Detail;