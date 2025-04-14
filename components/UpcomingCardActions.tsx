"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "./Loader";

function UpcomingCardActions({ callId }: { callId: string }) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callId}`;
  const router = useRouter();
  router.prefetch(meetingLink);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClipboard = (): void => {
    navigator.clipboard.writeText(meetingLink);
    toast.success("Link Copied");
  };

  return (
    <div className="flex gap-3">
      <Button
        className="bg-blue-100 hover:bg-blue-100/70"
        onClick={() => {
          setIsLoading(true);
          router.push(meetingLink);
          setIsLoading(false);
          toast.success("You joined the meeting successfuly");
        }}
        disabled={isLoading}
      >
        {isLoading ? <Loader size={30} className="h-full"/> : "Start"}
      </Button>
      <Button
        className="bg-dark-200 hover:bg-dark-200/70"
        onClick={handleClipboard}
      >
        <Image
          src="/icons/copy.svg"
          alt="copy icon"
          width={14}
          height={14}
        />
        Copy Invitation
      </Button>
    </div>
  );
}
export default UpcomingCardActions;
