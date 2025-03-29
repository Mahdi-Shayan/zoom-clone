import { avatarImages } from "@/constanst";
import Image from "next/image";
import { Button } from "./ui/button";

function UpcomingCard() {
  return (
    <div className="flex-1 flex flex-col gap-4 bg-dark-300 p-5 rounded-xl">
      <svg
        width="27"
        height="27"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 0C5.55228 0 6 0.44772 6 1V2H14V1C14 0.44772 14.4477 0 15 0C15.5523 0 16 0.44772 16 1V2H17C18.6569 2 20 3.34315 20 5V12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12V8H2V17C2 17.5523 2.44772 18 3 18H8C8.5523 18 9 18.4477 9 19C9 19.5523 8.5523 20 8 20H3C1.34315 20 0 18.6569 0 17V5C0 3.34315 1.34315 2 3 2H4V1C4 0.44772 4.44772 0 5 0ZM3 4C2.44772 4 2 4.44772 2 5V6H18V5C18 4.44772 17.5523 4 17 4H3Z"
          fill="#ffffff"
        />
        <path
          d="M16.2929 15.7071C15.9024 15.3166 15.9024 14.6834 16.2929 14.2929C16.6834 13.9024 17.3166 13.9024 17.7071 14.2929L19.7071 16.2929C20.0976 16.6834 20.0976 17.3166 19.7071 17.7071L17.7071 19.7071C17.3166 20.0976 16.6834 20.0976 16.2929 19.7071C15.9024 19.3166 15.9024 18.6834 16.2929 18.2929L17.5858 17L16.2929 15.7071Z"
          fill="#ffffff"
        />
        <path
          d="M11.2929 14.2929C10.9024 14.6834 10.9024 15.3166 11.2929 15.7071L12.5858 17L11.2929 18.2929C10.9024 18.6834 10.9024 19.3166 11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L14.7071 17.7071C15.0976 17.3166 15.0976 16.6834 14.7071 16.2929L12.7071 14.2929C12.3166 13.9024 11.6834 13.9024 11.2929 14.2929Z"
          fill="#ffffff"
        />
      </svg>
      <h3 className="capitalize font-bold text-lg">
        Team Sync: Sprint Planning & Updating
      </h3>
      <p className="text-sky-200 max-lg:text-sm">
        March 15, 2024 - 10:00 AM
      </p>
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
        <div className="flex gap-3">
          <Button className="bg-blue-100 hover:bg-blue-100/70">Start</Button>
          <Button className="bg-dark-200 hover:bg-dark-200/70">
            <Image src="/icons/copy.svg" alt="copy icon" width={14} height={14}/>
            Copy Invitation
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpcomingCard;
