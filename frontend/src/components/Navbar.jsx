import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch }) => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Searching for:", query);
    onSearch(query);
  }

  return (
    <nav className="fixed top-0 left-0 h-[87px] flex justify-between items-center w-full bg-[#F9F9F9] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)] pt-4 px-4 sm:px-8 md:px-16 lg:px-[124px]">
      {/* Logo */}
      <div className="w-20 sm:w-[100px] h-[45px] sm:h-[55px]">
        <div
          className='bg-[url("/HDlogo1.png")] w-full h-full bg-contain bg-no-repeat cursor-pointer'
          onClick={handleSearch}
        ></div>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 sm:gap-4 h-[42px] w-full max-w-[443px]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Experience"
          className="flex-1 min-w-0 h-[42px] py-2 px-3 sm:py-3 sm:px-4 bg-[#EDEDED] outline-none focus:outline-2 focus:outline-purple-500 focus:outline-offset-0 rounded"
        />
        <button
          className="w-[70px] sm:w-[87px] h-[42px] rounded-lg py-2 sm:py-3 px-3 sm:px-5 cursor-pointer bg-[#FFD643] text-center font-medium font-inter text-[12px] sm:text-[14px] leading-[18px] tracking-normal hover:bg-amber-400"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </nav>




  )
}

export default Navbar
