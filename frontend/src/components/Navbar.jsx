import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = ({onSearch}) => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = ()=>{
    console.log("Searching for:", query);
    onSearch(query);
  }

  return (
    <nav className='fixed h-[87px] flex justify-between pt-4 px-[124px] items-center bg-[#F9F9F9] w-full shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)]'>
        <div className='w-[100px] h-[55px]' >
            <div className='bg-[url("/HDlogo1.png")] w-full h-full bg-contain bg-no-repeat cursor-pointer ' onClick={handleSearch}></div>
        </div>
        <div className='flex items-center h-[42PX] w-[443px] gap-4'>
            <input
                type="text"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Search Experience"
                className='w-[340px] h-[42px] py-3 px-4 bg-[#EDEDED] outline-none focus:outline-2 focus:outline-purple-500 focus:outline-offset-0'
             />
             <button className='w-[87px] h-[42px] rounded-lg py-3 px-5 cursor-pointer bg-[#FFD643] text-center font-medium font-inter text-[14px] leading-[18px] tracking-normal hover:bg-amber-400' onClick={handleSearch} >Search</button>

        </div>
    </nav>





  )
}

export default Navbar
