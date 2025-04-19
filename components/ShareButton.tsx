"use client"

import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

function ShareButton({ url }: { url: string }) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Meeting Recording",
          text: "Watch the recording of our meeting here:",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Recording link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share the link.");
      console.error(error);
    }
  };
  return (
    <Button
      className="flex-1 bg-dark-200 hover:bg-dark-200/75 p-5"
      onClick={handleShare}
    >
      <Share2 />
      Share
    </Button>
  );
}
export default ShareButton;
