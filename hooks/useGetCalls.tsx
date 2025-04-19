import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isCallLoading, setIsCallLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsCallLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
        toast.error('Try again later.')
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const previousCalls = calls?.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return (startsAt && new Date(startsAt) < now) || !!endedAt;
    }
  );

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return {
    previousCalls,
    upcomingCalls,
    callRecordings: calls,
    isCallLoading,
  };
};
