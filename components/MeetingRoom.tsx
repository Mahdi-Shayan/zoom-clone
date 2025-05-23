"use client";

import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { LayoutList, MoreVertical, Users } from "lucide-react";
import { Button } from "./ui/button";
import EndCallBtn from "./EndCallBtn";
import Loader from "./Loader";

type CamLayoutType = "grid" | "speaker-right" | "speaker-left";

function MeetingRoom() {
  const [layout, setLayout] = useState<CamLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const [groupSize, setGroupSize] = useState<number>(5);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);

  useEffect(() => {
    function handleScreenSize() {
      if (window.innerWidth < 550) {
        setGroupSize(2);
      }
      if (window.innerWidth > 550) {
        setGroupSize(4);
      }
      if (window.innerWidth > 800) {
        setGroupSize(9);
      }
      if (window.innerWidth > 1000) {
        setGroupSize(12);
      }

      if (window.innerWidth > 800) {
        setIsSmallScreen(false);
      } else {
        setIsSmallScreen(true);
      }
    }

    handleScreenSize();

    window.addEventListener("resize", handleScreenSize);
  }, []);

  const CamLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout groupSize={groupSize} />;
        break;
      case "speaker-right":
        if (isSmallScreen) {
          return <SpeakerLayout participantsBarPosition="top" />;
        }
        return <SpeakerLayout participantsBarPosition="left" />;
        break;
      default:
        if (isSmallScreen) {
          return <SpeakerLayout participantsBarPosition="bottom" />;
        }
        return <SpeakerLayout participantsBarPosition="right" />;
        break;
    }
  };

  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED) return <Loader />

  return (
    <section className="relative h-screen w-full pt-4 text-white overflow-hidden">
      <div className="relative flex justify-center items-center size-full">
        <div className="flex size-full w-[90%] max-w-[1200px] max-lg:mb-30 mb-15 pt-10">
          <CamLayout />
        </div>

        {/* Call Participants List */}
        <div
          className={cn(
            "absolute right-5 h-[calc(100vh-86px)] ml-2 bg-dark-300 p-5 rounded-lg hidden z-10",
            {
              "show-block": showParticipants,
            }
          )}
        >
          <CallParticipantsList
            onClose={() => setShowParticipants(false)}
          />
        </div>
      </div>

      {/* Call Controls */}
      <div className="fixed bottom-0 w-full flex-center gap-4 max-sm:flex-col max-sm:gap-1 max-sm:bottom-4">
        <CallControls />
        <EndCallBtn />
      </div>
      <div className="fixed top-5 left-4 space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="control-btn">
            <LayoutList size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark-300 text-white border-none">
            {["Grid", "Speaker-left", "Speaker-right"].map((item) => (
              <DropdownMenuCheckboxItem
                key={item}
                checked={(item.toLowerCase() as CamLayoutType) === layout}
                onCheckedChange={() =>
                  setLayout(item.toLowerCase() as CamLayoutType)
                }
                className="cursor-pointer"
                onClick={() =>
                  setLayout(item.toLowerCase() as CamLayoutType)
                }
              >
                {isSmallScreen
                  ? item === "Speaker-left"
                    ? "Speaker-top"
                    : item === "Speaker-right"
                    ? "Speaker-bottom"
                    : "Grid"
                  : item}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          className="control-btn"
          onClick={() => setShowParticipants((pre) => !pre)}
        >
          <Users />
        </Button>
      </div>
    </section>
  );
}
export default MeetingRoom;
