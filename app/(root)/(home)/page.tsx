import DigitalClock from "@/components/DigitalClock";
import HomeFacilities from "@/components/HomeFacilitiesList";
import PageTitle from "@/components/PageTitle";
import dayjs from "dayjs";
import Link from "next/link";
import CallsList from "@/components/CallsList";

function Home() {
  const today = dayjs().format("dddd ,MM MMMM YYYY");

  return (
    <div className="flex flex-col gap-8">
      <section className="bg-hero flex flex-col justify-between p-8 bg-[url(/images/hero-background.png)] bg-no-repeat bg-cover bg-center h-[300px] rounded-2xl max-xs:h-55">
        <p className="bg-white/5 w-max p-2 rounded-sm text-sky-50 max-md:text-sm max-xs:!text-[13px]">
          Upcoming Meeting at: 12:30 PM
        </p>
        <div>
          <DigitalClock />
          <p className="lg:text-2xl md:text-xl max-xs:text-sm text-sky-300 mt-2">
            {today}
          </p>
        </div>
      </section>
      {/* Facilities */}
      <HomeFacilities />
      <section>
        <div className="flex max-md:flex-col justify-between md:items-center w-full max-md:mb-6">
          <PageTitle title="Today’s Upcoming Meetings" />
          <Link href="/upcoming">See all</Link>
        </div>
        <div className="w-full">
          <CallsList type="upcoming" />
        </div>
      </section>
    </div>
  );
}

export default Home;
