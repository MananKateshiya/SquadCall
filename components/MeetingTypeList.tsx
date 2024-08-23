'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';
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

    const callLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
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

            <MeetingModel
                isOpen={callState === 'isJoiningCall'}
                onClose={() => setcallState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Call"
                handleClick={() => { router.push(values.link) }}
            >
                <Input
                    placeholder='Call link'
                    className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                />

            </MeetingModel>


            {!callDetails ? (
                <MeetingModel
                    isOpen={callState === 'isScheduleCall'}
                    onClose={() => setcallState(undefined)}
                    title="Create Call"
                    handleClick={createCall}
                >
                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base font-normal leading-[22px] text-sky-2'>
                            Add a description
                        </label>
                        <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => { setValues({ ...values, description: e.target.value }) }} />

                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                        <label className='text-base font-normal leading-[22px] text-sky-2'>
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => {
                                setValues({
                                    ...values,
                                    dateTime: date!

                                })
                            }}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='time'
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className='w-full rounded bg-dark-3 p-2 focus:outline-none'
                        />
                    </div>
                </MeetingModel>
            ) : (
                <MeetingModel
                    isOpen={callState === 'isScheduleCall'}
                    onClose={() => setcallState(undefined)}
                    title="Call Created"
                    className="text-center"
                    handleClick={() => {
                        navigator.clipboard.writeText(
                            callLink
                        );
                        toast({ title: 'Link Copied' })

                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                    buttonText="Copy Call Link"
                />
            )}
        </section>
    )
}

export default MeetingTypeList