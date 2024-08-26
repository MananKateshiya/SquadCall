"use client";

import MeetingTypeList from '@/components/MeetingTypeList';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

function Home() {
  
  const user = useUser();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');


  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'long',  // e.g., "Thursday"
    year: 'numeric',  // e.g., "2024"
    month: 'long',    // e.g., "August"
    day: 'numeric'   // e.g., "22"
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour12: true,
    timeStyle: 'medium'
  };

  useEffect(() => {

    const updateDateTime = () => {
      const date = new Date();
      const dateAdvance = date.toLocaleDateString("en-IN", { ...optionsDate, timeZone: 'Asia/Kolkata' });
      const time = date.toLocaleTimeString("en-IN", { ...optionsTime, timeZone: 'Asia/Kolkata' });

      setCurrentDate(dateAdvance);
      setCurrentTime(time);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className="flex h-full flex-col justify-around max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className='glassmorphism max-w-[170px] rounded py-2 px-6 text-base font-normal'>Hello, {user.user?.username?.toUpperCase()} </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{currentTime.toUpperCase()}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{currentDate}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home