'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';

function MeetingTypeList() {

    const router = useRouter();

    const [callState, setcallState] = useState<'isScheduleCall' | 'isJoiningCall' | 'isInstantCall' | undefined>();

    const createCall = () => {

    }
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
           <HomeCard 
           img="/icons/add-meeting.svg"
           title="New Calls"
           description="Start an instant call"
           handleClick={()=> setcallState('isInstantCall')}
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

           <MeetingModel 
            isOpen={callState === 'isInstantCall'}
            onClose={() => setcallState(undefined)}
            title="Start an Instant Call"
            className="text-center"
            buttonText="Start Call"
            handleClick={createCall}
           />
        </section>
    )
}

export default MeetingTypeList