'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';

function MeetingTypeList() {

    const router = useRouter();

    const [callState, setcallState] = useState<'isScheduleCall' | 'isJoiningCall' | 'isInstantCall' | undefined>();

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
           <HomeCard 
           img="/icons/add-meeting.svg"
           title="New Calls"
           description="Start an instant call"
           handleClick={()=> setcallState('isJoiningCall')}
           className="bg-orange-1"
           />
            <HomeCard 
           img="/icons/schedule.svg"
           title="Schedule Calls"
           description="Plan a call"
           handleClick={()=> setcallState('isScheduleCall')}
           className="bg-blue-1"
           />
            <HomeCard 
           img="/icons/recordings.svg"
           title="View Recordings"
           description="Check out your recordings"
           handleClick={()=> router.push('/recordings')}
           className="bg-purple-1"
           />
            <HomeCard 
           img="/icons/join-meeting.svg"
           title="Join Call"
           description="via invitation link"
           handleClick={()=> setcallState('isJoiningCall')}
           className="bg-yellow-1"
           />
        </section>
    )
}

export default MeetingTypeList