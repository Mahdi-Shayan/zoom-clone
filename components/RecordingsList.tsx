"use client";

import Loader from "./Loader";
import Image from "next/image";
import dayjs from "dayjs";
import ShareButton from "./ShareButton";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

function RecordingsList() {
  const [recordingUrl, setRecordingUrl] = useState<string>();
  const { callRecordings, isCallLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>();

  useEffect(() => {
    const recordingsList = document.querySelector(
      "#recordings-list"
    ) as HTMLDivElement | null;

    if (recordingsList) {
      recordingsList.style.filter = recordingUrl
        ? "blur(5px)"
        : "blur(0px)";
    }

    document.body.style.overflow = recordingUrl ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [recordingUrl]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast.error("Try again later.");
        console.error(error)
      }
    };

    fetchRecordings();
  }, [callRecordings]);

  if (isCallLoading) return <Loader className="h-full" />;

  if (!callRecordings || !callRecordings.length)
    return (
      <h3 className="flex-center h-full font-bold text-3xl text-sky-300">
        There is no meeting recordings
      </h3>
    );

  return (
    <>
      {recordingUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute top-[50%] left-[50%] translate-[-50%] w-[60%] md:min-w-150 min-w-120 max-sm:min-w-80 z-50"
        >
          <button
            className="text-4xl cursor-pointer py-5 text-right w-full"
            onClick={() => setRecordingUrl(undefined)}
          >
            x
          </button>
          <video
            controls
            src={recordingUrl}
            playsInline
            className="rounded-xl"
          />
        </motion.div>
      )}
      {/* Recordings List */}
      <div
        id="recordings-list"
        className="grid grid-cols-2 gap-5 max-md:grid-cols-1"
      >
        {recordings?.map((recording) => {
          const { filename, end_time, start_time, url } = recording;

          return (
            <div
              key={recording.url}
              className="bg-dark-300 px-6 py-8 rounded-2xl space-y-8"
            >
              <div className="flex flex-col gap-3">
                <Image
                  src="/icons/Video.svg"
                  alt="recording"
                  height={30}
                  width={30}
                />
                <h3 className="font-bold text-xl">
                  {filename.length > 20
                    ? `${filename.slice(0, 20)}...`
                    : filename}
                </h3>
                <div className="flex gap-6 text-sky-200 max-sm:text-sm">
                  <p>
                    Start Time: {dayjs(end_time).format("H[hr] mm[mins]")}
                  </p>
                  <p>
                    End Time: {dayjs(start_time).format("H[hr] mm[mins]")}
                  </p>
                </div>
              </div>

              {/* Button Actions */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-blue-100 hover:bg-blue-100/75 p-5"
                  onClick={() => {
                    setRecordingUrl(url);
                  }}
                >
                  <Play />
                  Play
                </Button>
                <ShareButton url={url} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default RecordingsList;
