"use client"

import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';
import React from 'react'

function Home() {

  const getCalls = useGetCalls();
  var date = new Date();
  date.setDate(date.getDate());

  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'long',  // e.g., "Thursday"
    year: 'numeric',  // e.g., "2024"
    month: 'long',    // e.g., "August"
    day: 'numeric'   // e.g., "22"
  };
  
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour12: true,
    timeStyle: 'short'
  };
  
  var dateAdvance = date.toLocaleDateString("en-IN",  { ...optionsDate, timeZone: 'Asia/Kolkata' });
  var time = date.toLocaleTimeString("en-IN", { ...optionsTime, timeZone: 'Asia/Kolkata' });

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Call at: 12:30 PM</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time.toUpperCase()}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{dateAdvance}</p>
          </div>
        </div>
      </div>
        <MeetingTypeList />
    </section>
  )
}

export default Home