"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_SECRET_KEY!;

export async function tokenProvider() {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("No API key");
  if (!apiSecret) throw new Error("No API secret");

  // تنظیم iat برای 5 ثانیه قبل‌تر از زمان فعلی
  const issuedAt = Math.floor(Date.now() / 1000) - 5;

  const client = new StreamClient(apiKey, apiSecret);
  const token = client.generateUserToken({
    user_id: user.id,
    iat: issuedAt,
  });

  return token;
}
