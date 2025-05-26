"use client";

import { useRouter } from "next/navigation";
import HomeFacility from "./HomeFacility";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Input } from "./ui/input";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "./ui/textarea";
import Loader from "./Loader";
import { useGetCallById } from "@/hooks/useGetCallById";

type Facility = "new" | "join" | "schedule" | undefined;

function HomeFacilities() {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<Facility>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [meetingDetails, setMeetingDetails] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [isEmptyInput, setIsEmptyInput] = useState<boolean>(true);

  const [callId] = meetingDetails.link.split("meeting/");
  const { call } = useGetCallById(callId);

  const [callDetails, setCallDetails] = useState<Call>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createMeeting = async () => {
    if (!user || !client) return;
    setIsLoading(true);

    try {
      if (!meetingDetails.dateTime) {
        toast.error("Please select date and time");
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        meetingDetails.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
      const { description } = meetingDetails || "Instant meeting";

      await call.getOrCreate({
        notify: true,
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if ((!description && !isEmptyInput) || meetingState === "new")
        router.push(`/meeting/${call.id}`);

      setIsEmptyInput(true);
      setIsLoading(false);

      toast.success("Meeting created");
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message || "Faild to create meeting");
      }
      toast.error("Unknown error uccurred");
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-4 max-[1230px]:grid-cols-2 max-xs:grid-cols-1 gap-3 h-[260px] max-[1230px]:h-[360px] max-xs:h-[650px]">
      <HomeFacility
        className="bg-orange-100"
        imageUrl="/icons/add-meeting.svg"
        title="New Meeting"
        description="Setup a new recording"
        handleClick={() => {
          setMeetingState("new");
        }}
      />
      <HomeFacility
        className="bg-blue-100"
        imageUrl="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => {
          setMeetingState("join");
        }}
      />
      <HomeFacility
        className="bg-purple-100"
        imageUrl="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => {
          setMeetingState("schedule");
        }}
      />
      <HomeFacility
        className="bg-yellow-100"
        imageUrl="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting recordings"
        handleClick={() => {
          router.push("/recordings");
        }}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "schedule"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={() => {
            if (isEmptyInput) {
              toast.error("Please fill the description");
              return;
            }
            createMeeting();
          }}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-200 focus-visible:ring-0 focus-visible:ring-offset-0 outline-0"
              onChange={(e) => {
                setMeetingDetails({
                  ...meetingDetails,
                  description: e.target.value,
                });
                setIsEmptyInput(false);
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <DatePicker
              selected={meetingDetails.dateTime}
              onChange={(date) =>
                setMeetingDetails({ ...meetingDetails, dateTime: date! })
              }
              filterDate={(date) => {
                const today = new Date(Date.now());
                return date >= today;
              }}
              filterTime={(time) => {
                const currentTime = new Date(Date.now());
                return time >= currentTime;
              }}
              // showIcon
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-200 p-2 px-3 mt-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "schedule"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "join"}
        onClose={() => setMeetingState(undefined)}
        title="Paste the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => {
          const now = new Date();
          const meetingStart = new Date(meetingDetails.dateTime);
          if (isEmptyInput) {
            toast.error("Please paste the room's link");
            return;
          }
          if (!call) {
            toast.error("No room exists");
            return;
          }
          if (meetingStart > now) {
            toast.error("The meeting has not started yet");
            return;
          }
          router.push(meetingDetails.link);
        }}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => {
            setMeetingDetails({ ...meetingDetails, link: e.target.value });
            setIsEmptyInput(false);
          }}
          className="border-none py-5 bg-dark-200 focus-visible:ring-0 focus-visible:ring-offset-0 outline-0"
        />
      </MeetingModal>
      <MeetingModal
        isOpen={meetingState === "new"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => {
          createMeeting();
        }}
        isLoading={isLoading}
      />
    </section>
  );
}

export default HomeFacilities;
