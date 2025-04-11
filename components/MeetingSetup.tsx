"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface Props {
  setIsSetupComplete: (value: boolean) => void;
}

function MeetingSetup({ setIsSetupComplete }: Props) {
  const [isMicCamToggledOn, setIsMicCamToggledOn] =
    useState<boolean>(false);
  const call = useCall();

  if (!call)
    throw new Error("usecall must be used within StreamCall component");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call.camera.enable();
      call.microphone.enable();
    } else {
      call.camera.disable();
      call.microphone.disable();
    }
  }, [isMicCamToggledOn, call.camera, call.microphone]);

  return (
    <section className="relative flex-center flex-col gap-5 w-full h-screen overflow-hidden">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex justify-center items-center gap-5 max-sm:flex-col">
        <div className="flex gap-5">
          <label className="flex-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isMicCamToggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            />
            Join with mic and camera off
          </label>
          <DeviceSettings />
        </div>
        <Button
          className="p-5 bg-green-700 hover:bg-green-800"
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </section>
  );
}
export default MeetingSetup;
