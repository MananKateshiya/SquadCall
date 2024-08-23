'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"

function MeetingTypeList() {

    const router = useRouter();

    const [callState, setcallState] = useState<'isScheduleCall' | 'isJoiningCall' | 'isInstantCall' | undefined>();

    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })

    const [callDetails, setCallDetails] = useState<Call>()

    const { toast } = useToast();

    const createCall = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast({
                    title: "Please select a date and time",
                })
                return
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('Failed to create call')

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant call';


            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }

            toast({
                title: "Call created",
            })
        } catch (error) {
            console.log(error);

            toast({
                title: "Failed to create call",
            })
        }
    }
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Calls"
                description="Start an instant call"
                handleClick={() => setcallState('isInstantCall')}
                className="bg-orange-1"
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Calls"
                description="Plan a call"
                handleClick={() => setcallState('isScheduleCall')}
                className="bg-blue-1"
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check out your recordings"
                handleClick={() => router.push('/recordings')}
                className="bg-purple-1"
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Call"
                description="via invitation link"
                handleClick={() => setcallState('isJoiningCall')}
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