"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";

const Table = ({
  title,
  description,
  className,
  onClick,
}: {
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-300 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1
        className={cn(
          "truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl",
          className
        )}
        onClick={onClick}
      >
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <PageTitle title="Personal Meeting Room" />
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.username}'s Meeting Room`}
        />
        <Table title="Meeting ID" description={meetingId!} />
        <Table
          title="Invite Link"
          description={meetingLink}
          className="text-blue-100 hover:underline cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
        />
      </div>
      <div className="flex gap-3 mt-10">
        <Button
          className="bg-blue-100 hover:bg-blue-100/75 p-5"
          onClick={startRoom}
        >
          Start The Meeting
        </Button>
        <Button
          className="bg-dark-200 hover:bg-dark-200/75 p-5"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
