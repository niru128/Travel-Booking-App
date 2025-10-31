import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import api from "../api/api.js";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { experienceId: routeId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // ✅ Load from either state or localStorage
  useEffect(() => {
    if (state) {
      localStorage.setItem("checkoutData", JSON.stringify(state));
      setCheckoutData(state);
    } else {
      const saved = localStorage.getItem("checkoutData");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCheckoutData(parsed);
      }
    }
  }, [state]);

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);

  // ✅ Handle missing data
  if (!checkoutData) {
    return <div>No data available. Please go back and select an experience.</div>;
  }

  const { experience, experienceId, date, time, people, pricePerPerson } = checkoutData;

  const subtotal = pricePerPerson * people;
  const tax = 59;
  const total = subtotal + tax;
  const finalTotal = discount ? total - discount : total;

  // ✅ Apply promo code
  const applyPromo = async () => {
    try {
      const { data } = await api.post("/promo/validate", {
        code: promoCode,
        totalAmount: total,
      });

      setDiscount(data.discount);
      setMessage(data.message);

    } catch (error) {
      setDiscount(null);
      setMessage("Invalid promo code");
    }
  };



  // ✅ Handle booking confirmation
  const handleConfirm = async () => {
    if (!checked) {
      alert("Please agree to the terms and safety policy.");
      return;
    }

    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    try {
      const { data } = await api.post("/checkout", {
        name,
        email,
        experienceId,
        date,
        people,
        promoCode,
        acceptTerms: checked,
      });

      // Clear stored data after successful booking
      localStorage.removeItem("checkoutData");
      navigate("/booking-confirmed", { state: { booking: data } });
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="pt-5 px-[124px] pb-10 flex flex-col gap-4">
      <button
        className="cursor-pointer hover:text-blue-950 flex flex-row gap-2 items-center"
        onClick={handleBack}
      >
        <img src="/Vector.png" className="w-[12.99px] h-[12.65px]" />
        <p>Checkout</p>
      </button>

      <div className="flex flex-row gap-10">
        {/* Left side: form */}
        <div className="flex flex-col w-[739px] h-[198px] rounded-xl py-5 px-6 gap-4 bg-[#EFEFEF]">
          <div className="w-full gap-6 flex flex-row">
            {/* Name */}
            <div className="flex flex-col w-1/2 gap-2">
              <p className="text-[14px] font-medium text-[#4F4F4F]">Full name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md h-[42px] py-3 px-4 bg-[#DDDDDD]"
                placeholder="Your Name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col w-1/2 gap-2">
              <p className="text-[14px] font-medium text-[#4F4F4F]">Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md h-[42px] py-3 px-4 bg-[#DDDDDD]"
                placeholder="Your Email"
              />
            </div>
          </div>

          {/* Promo */}
          <div className="flex flex-row gap-4 items-center">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="h-[42px] w-[604px] rounded-md py-3 px-4 bg-[#DDDDDD]"
            />
            <button
              onClick={applyPromo}
              className="w-[71px] h-[42px] py-3 px-4 bg-[#161616] hover:cursor-pointer hover:bg-amber-950 text-[#F9F9F9] rounded-lg text-[14px] font-medium"
            >
              Apply
            </button>
          </div>



          {/* Terms */}
          <div className="flex flex-row items-center gap-2">
            <span onClick={() => setChecked(!checked)}>
              {checked ? (
                <MdCheckBox className="text-black h-5 w-5 cursor-pointer" />
              ) : (
                <MdCheckBoxOutlineBlank className="text-black h-5 w-5 cursor-pointer" />
              )}
            </span>
            <span className="font-medium text-[12px] text-[#5B5B5B]">
              I agree to the terms and safety policy
            </span>
          </div>
        </div>

        {/* <div className="w-[387px] h-[349px] rounded-xl p-6 absolute top-[155px] left-[929px] flex flex-col bg-[#EFEFEF]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between">
                <span className="text-[#656565]">Experience</span>
                <span>{experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Date</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Time</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Quantity</span>
                <span>{people}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between">
                <span className="text-[#656565]">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Tax</span>
                <span>₹{tax}</span>
              </div>
            </div>

            <hr className="border-[#D9D9D9]" />

            <div className="flex justify-between">
              <span className="text-[#656565]">Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-6 py-3 px-5 rounded-lg h-11 w-[339px] bg-[#FFd643] text-[#161616] text-[16px] font-medium hover:bg-amber-400"
          >
            Pay and Confirm
          </button>
        </div> */}
        <div className="w-[387px] h-[380px] rounded-xl p-6 absolute top-[155px] left-[929px] flex flex-col bg-[#EFEFEF]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between">
                <span className="text-[#656565]">Experience</span>
                <span>{experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Date</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Time</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Quantity</span>
                <span>{people}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between">
                <span className="text-[#656565]">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Tax</span>
                <span>₹{tax}</span>
              </div>
            </div>

            <hr className="border-[#D9D9D9]" />

            <div className="flex justify-between">
              <span className="text-[#656565]">Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>
          <button
            onClick={handleConfirm}
            className="mt-6 py-3 px-5 rounded-lg h-11 w-[339px] bg-[#FFd643] text-[#161616] text-[16px] font-medium hover:bg-amber-400"
          >
            Pay and Confirm
          </button>

        </div>

      </div>
    </div>
  );
};

export default Checkout;
