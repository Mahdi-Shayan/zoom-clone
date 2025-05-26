"use client";
import { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = time.toLocaleTimeString("en-GB");

  return (
    <div className="lg:text-6xl md:text-6xl max-xs:text-[40px] text-5xl font-bold">
      {timeString}
    </div>
  );
}

export default DigitalClock;