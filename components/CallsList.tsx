"use client";

import { useGetUpcomingCalls } from "@/hooks/useGetCalls";
import Loader from "./Loader";
import CallDetailsCard from "./CallDetailsCard";
import dayjs from "dayjs";

function CallsList({ limit }: { limit?: number }) {
  const { upcomingCalls, isCallLoading } = useGetUpcomingCalls(
    limit && limit
  );

  if (isCallLoading) return <Loader className="h-full" />;

  return (
    <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
      {upcomingCalls?.map((call) => {
        const description = call.state.custom.description;
        const date = dayjs(call.state.startsAt as Date).format(
          "DD MMMM, YYYY - HH:MM A"
        );

        return (
          <div key={call.id}>
            <CallDetailsCard
              description={description}
              date={date}
              callId={call.id}
            />
          </div>
        );
      })}
    </div>
  );
}
export default CallsList;
