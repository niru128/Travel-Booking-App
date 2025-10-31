import React from 'react'
import { useNavigate } from 'react-router-dom';

const ExperienceCard = ({ experience }) => {

    const navigate = useNavigate();
    return (
        <div className='flex flex-col w-[280px] h-[312px] rounded-xl bg-white shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200'>
            <img className=' w-[280px] h-[170px]' src={experience.image} alt={experience.title} />
            <div className='py-3 px-4 flex flex-col gap-5 bg-[#F0F0F0]'>
                <div className='flex flex-col gap-3'>
                    <div className='w-[248px] h-6 flex items-center justify-between'>
                        <h1 className='font-medium text-[16px] leading-4 tracking-normal text-[#161616] w-[70px] h-5 grow'>{experience.title}</h1>

                        <span className='h-6 rounded-sm py-1 px-2 gap-2.5 bg-[#D6D6D6] text-[11px] leading-4'>{experience.location}</span>
                    </div>
                    <div className='w-[248px] h-8'>
                        <p className='font-inter font-normal text-[12px] leading-4 tracking-normal text-[#6C6C6C]'>{experience.description}</p>
                    </div>
                </div>
                <div className='h-[30px] w-[248px] justify-between flex items-center'>
                    <div className='w-[85px] h-6 flex justify-between items-center  '>
                        <span className='font-inter font-normal text-[12px] leading-4 tracking-normal text-[#161616] w-[29px] h-4'>From</span>
                        <span className='font-inter font-medium text-[20px] leading-6 tracking-normal text-[#161616] w-[50px] h-6'>₹{experience.pricePerPerson}</span>
                    </div>

                    <button className='py-1.5 px-2 gap-2.5 w-[99px] h-[30px] bg-[#FFD643] text-[14px] leading-[18px] hover:bg-amber-400 cursor-pointer'
                    onClick={()=> navigate(`/experience/${experience._id}`)}
                     >View Details</button>
                </div>
            </div>

        </div>
    )
}

export default ExperienceCard
