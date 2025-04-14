"use client";

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export function useGetUpcomingCalls(limit?: number) {
  const [upcomingCalls, setUpcomingCalls] = useState<Call[]>();
  const [isCallLoading, setIsCallLoading] = useState<boolean>(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;
    const bufferMinutes = 15;
    const pastTime = new Date(Date.now() - bufferMinutes * 60 * 1000);

    const upcomingCalls = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          $and: [
            { ended_at: { $exists: false } },
            { starts_at: { $gt: pastTime } },
          ],
        },
        sort: [{ field: "starts_at", direction: -1 }],
        watch: true,
        limit,
      });

      setUpcomingCalls(calls);
      setIsCallLoading(false);
    };

    upcomingCalls();
  }, [client]);

  return { upcomingCalls, isCallLoading };
}
