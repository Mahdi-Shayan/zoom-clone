import Image from "next/image";
import Link from "next/link";

function HomeFacilities() {
  return (
    <ul className="grid grid-cols-4 max-[1230px]:grid-cols-2 gap-3 h-[260px] max-[1230px]:h-[360px]">
      <li className="facilitie-card bg-orange-100">
        <div className="relative">
          <Image
            src="/icons/add-meeting.svg"
            alt="add meeting icon"
            fill
            className="p-2"
          />
        </div>
        <div>
          <h3>New Meeting</h3>
          <p>Setup a new recording</p>
        </div>
      </li>
      <li className="facilitie-card bg-blue-100">
        <div className="relative">
          <Image
            src="/icons/join-meeting.svg"
            alt="add meeting icon"
            fill
            className="p-2"
          />
        </div>
        <div>
          <h3>Join Meeting</h3>
          <p>via invitation link</p>
        </div>
      </li>
      <li className="facilitie-card bg-purple-100">
        <div className="relative">
          <Image
            src="/icons/schedule.svg"
            alt="add meeting icon"
            fill
            className="p-2"
          />
        </div>
        <div>
          <h3>Schedule Meeting</h3>
          <p>Plan your meeting</p>
        </div>
      </li>
      <Link href='/recordings' className="facilitie-card bg-yellow-100">
        <div className="relative">
          <Image
            src="/icons/recordings.svg"
            alt="add meeting icon"
            fill
            className="p-2"
          />
        </div>
        <div>
          <h3>View Recordings</h3>
          <p>Meeting recordings</p>
        </div>
      </Link>
    </ul>
  );
}

export default HomeFacilities;
