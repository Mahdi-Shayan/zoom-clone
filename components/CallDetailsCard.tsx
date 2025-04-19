import { avatarImages } from "@/constanst";
import Image from "next/image";
import UpcomingCardActions from "./UpcomingCardActions";

interface Props {
  description: string;
  date: string;
  callId: string;
  type: "previous" | "upcoming";
}

function CallDetailsCard({ description, date, callId, type }: Props) {
  return (
    <div className="flex-1 flex flex-col gap-4 bg-dark-300 p-5 rounded-xl">
      <Image
        src={`/icons/${type === "previous" ? "previous" : "upcoming"}.svg`}
        alt={`${type} icon`}
        width={28}
        height={28}
      />
      <h3 className="capitalize font-bold text-lg">{description}</h3>
      <p className="text-sky-200 max-lg:text-sm">{date}</p>
      <div className="flex max-xl:flex-col max-md:flex-row max-sm:flex-col justify-between xl:items-center max-xl:gap-7 mt-5">
        <div className="flex space-x-[-15px]">
          {avatarImages.slice(0, 4).map((img, ind) => (
            <Image
              key={ind}
              src={img}
              alt="avatar"
              height={45}
              width={45}
              className="rounded-full border-3 border-dark-200"
            />
          ))}
          {avatarImages.length > 4 && (
            <div className="bg-dark-100 w-[45px] h-[45px] flex-center rounded-full border-3 border-dark-200">
              +{avatarImages.slice(4).length}
            </div>
          )}
        </div>
        {type === "upcoming" && <UpcomingCardActions callId={callId} />}
      </div>
    </div>
  );
}

export default CallDetailsCard;
