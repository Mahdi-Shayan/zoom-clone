"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import Loader from "./Loader";
import CallDetailsCard from "./CallDetailsCard";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface Props {
  isPage?: boolean;
  type: "previous" | "upcoming";
}

function CallsList({ isPage = false, type }: Props) {
  const { upcomingCalls, previousCalls, isCallLoading } = useGetCalls();

  if (isCallLoading) return <Loader className="h-full" />;

  if (!upcomingCalls?.length && type === "upcoming")
    return (
      <h3
        className={cn(
          "h-full text-lg font-bold text-sky-300",
          isPage && "text-3xl flex-center"
        )}
      >
        There is no upcoming call!
      </h3>
    );
  if (!previousCalls?.length && type === "previous")
    return (
      <h3
        className={cn(
          "h-full text-lg font-bold text-sky-300",
          isPage && "text-3xl flex-center"
        )}
      >
        There is no previous call!
      </h3>
    );

  function getCall() {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
        break;
      case "previous":
        return previousCalls;
        break;
    }
  }

  return (
    <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
      {getCall()?.map((call) => {
        const description = call.state.custom.description;
        const date = dayjs(call.state.startsAt as Date).format(
          "DD MMMM, YYYY - HH:MM A"
        );

        return (
          <div key={call.id}>
            <CallDetailsCard
              description={description || "Personal room"}
              date={date}
              callId={call.id}
              type={type}
            />
          </div>
        );
      })}
    </div>
  );
}
export default CallsList;
