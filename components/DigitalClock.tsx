"use client";
import dynamic from "next/dynamic";

const LiveClock = dynamic(() => import("react-live-clock"), {
  ssr: false,
});

function DigitalClock() {
  return (
    <>
      <LiveClock
        format="hh:mm"
        ticking={true}
        className="lg:text-7xl md:text-6xl max-xs:text-[40px] text-5xl font-bold"
      />
      <LiveClock format="A" className="lg:text-2xl text-lg ml-3" />
    </>
  );
}

export default DigitalClock;
