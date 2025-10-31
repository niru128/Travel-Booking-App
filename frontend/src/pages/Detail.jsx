import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api.js";

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

    const bookingData = {
      experience: experience.title,
      experienceId: experience._id,
      date: selectedDate,
      time: selectedTime,
      people,
      pricePerPerson: experience.pricePerPerson,
    };

    localStorage.setItem("checkoutData", JSON.stringify(bookingData));
    navigate(`/checkout/${experience._id}`);
  };

  useEffect(() => {
    if (experience && experience.availableSlots[0]?.times) {
      const counts = experience.availableSlots[0].times.map(() =>
        Math.floor(Math.random() * 5) + 1
      );
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
    };
    fetchExperience();
  }, [id]);

  const handleBack = () => navigate(-1);

  if (loading) return <div className="text-center items-center justify-center">Loading...</div>;
  if (!experience) return <div className="text-center items-center justify-center" >Error loading experience details.</div>;

  return (
    <div className="pt-5 px-4 sm:px-8 md:px-16 lg:px-[124px] pb-10 flex flex-col gap-4">
      {/* Back Button */}
      <button
        className="cursor-pointer hover:text-blue-950 flex flex-row gap-2 items-center"
        onClick={handleBack}
      >
        <img
          src="/Vector.png"
          className="w-[12.99px] h-[12.65px]"
          alt="Back"
        />
        <p>Detail</p>
      </button>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left Content */}
        <div className="flex-1 flex flex-col">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-[220px] sm:h-[300px] md:h-[380px] object-cover rounded-xl"
          />

          <div className="flex flex-col gap-4 mt-6">
            <div className="w-full flex flex-col gap-3">
              <h1 className="font-inter font-medium leading-8 text-[20px] sm:text-[22px] md:text-[24px] text-[#161616]">
                {experience.title}
              </h1>
              <p className="font-medium text-[14px] sm:text-[16px] text-[#6C6C6C]">
                {experience.description}
              </p>
            </div>

            {/* Date Selection */}
            <div className="flex flex-col gap-3">
              <h2 className="font-inter font-medium text-[16px] sm:text-[18px] text-[#161616]">
                Choose Date
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(slot.date)}
                    className={`px-3 py-2 border rounded-sm h-[34px] text-[14px] font-medium cursor-pointer ${
                      selectedDate === slot.date
                        ? "bg-[#FFD643] border-[#FF4C0A]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {slot.date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="flex flex-col gap-3">
              <h2 className="font-inter font-medium text-[16px] sm:text-[18px] text-[#161616]">
                Choose Time
              </h2>

              <div className="flex flex-wrap gap-2">
                {experience.availableSlots[0].times.map((timeObj, i) => {
                  const isSoldOut = timeObj.status === "soldOut";
                  return (
                    <button
                      key={i}
                      disabled={isSoldOut}
                      onClick={() => setSelectedTime(timeObj.time)}
                      className={`px-3 py-2 border rounded-sm h-[34px] text-[14px] font-medium ${
                        isSoldOut
                          ? "bg-[#CCCCCC] text-[#838383] cursor-not-allowed"
                          : selectedTime === timeObj.time
                          ? "bg-[#FFD643]"
                          : "bg-[#FFFFFF] text-[#838383]"
                      }`}
                    >
                      {timeObj.time}
                      <span className="text-[#FF4C0A] text-[10px] ml-1">
                        {isSoldOut
                          ? "Sold out"
                          : `${leftCounts[i] ?? 0} left`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[12px] text-[#838383]">
                All times are in IST (GMT +5:30)
              </div>
            </div>

            {/* About Section */}
            <div className="flex flex-col gap-2 mt-4">
              <p className="font-medium text-[16px] sm:text-[18px] text-[#161616]">
                About
              </p>
              <p className="font-medium text-[14px] text-[#838383]">
                Scenic routes, trained guides, and safety briefing. Minimum age
                10.
              </p>
            </div>
          </div>
        </div>

        {/* Right Summary Card */}
        <div className="w-full lg:w-[387px] mt-6 lg:mt-0 bg-[#F9F9F9] rounded-xl p-5 sm:p-6 flex flex-col justify-between border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-5">
            {/* Price Header */}
            <div className="flex justify-between items-center">
              <p className="text-[#6C6C6C] text-[14px]">Starts at</p>
              <p className="font-semibold text-[18px] text-[#161616]">
                ₹{experience.pricePerPerson}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex justify-between items-center">
              <p className="text-[#6C6C6C] text-[14px]">Quantity</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                >
                  –
                </button>
                <p className="w-8 text-center">{people}</p>
                <button
                  onClick={() => setPeople((p) => p + 1)}
                  className="w-7 h-7 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between">
              <p className="text-[#6C6C6C] text-[14px]">Subtotal</p>
              <p className="text-[#161616] text-[14px] font-medium">
                ₹{experience.pricePerPerson * people}
              </p>
            </div>

            {/* Tax */}
            <div className="flex justify-between border-b pb-3">
              <p className="text-[#6C6C6C] text-[14px]">Taxes</p>
              <p className="text-[#161616] text-[14px] font-medium">
                ₹{Math.round(experience.pricePerPerson * people * 0.06)}
              </p>
            </div>

            {/* Total */}
            <div className="flex justify-between">
              <p className="font-semibold text-[16px]">Total</p>
              <p className="font-semibold text-[16px] text-[#161616]">
                ₹
                {(
                  experience.pricePerPerson * people +
                  Math.round(experience.pricePerPerson * people * 0.06)
                ).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
              selectedDate && selectedTime
                ? "bg-[#FFD643] text-[#161616] hover:bg-amber-300"
                : "bg-gray-300 text-[#161616] cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
