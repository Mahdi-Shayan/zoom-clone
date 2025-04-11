"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function EndCallBtn() {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    call.state.createdBy.id === localParticipant.userId;

  if (!isMeetingOwner || !call) return null;
  return (
    <Button
    className="bg-red-700 hover:bg-red-400"
      onClick={async () => {
        await call.endCall();
        
        router.push("/");
      }}
    >
      End call for everyone
    </Button>
  );
}
export default EndCallBtn;
