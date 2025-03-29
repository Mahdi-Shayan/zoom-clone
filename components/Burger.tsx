"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

function Burger() {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    function handleClick() {
      const sidebar = document.querySelector("#sidebar") as HTMLDivElement;
      const rootContainer = document.querySelector(
        "#root-container"
      ) as HTMLDivElement;

      if (clicked) {
        sidebar.style.transform = "translateX(100%)";
        rootContainer.style.filter = "blur(5px)";
      } else {
        sidebar.style.transform = "translateX(0)";
        rootContainer.style.filter = "blur(0px)";
      }
    }

    handleClick();
  }, [clicked]);

  return (
    <div
      className="absolute right-10 max-md:right-6 top-[25px] space-y-[6px] cursor-pointer lg:hidden z-10"
      onClick={() => setClicked((pre) => !pre)}
    >
      <motion.div
        animate={
          clicked ? { rotate: "45deg", y: "7px" } : { rotate: 0, y: 0 }
        }
        className="w-7 h-[2px] bg-white rounded-full"
      />
      <motion.div
        animate={clicked ? { display: "none" } : { display: "block" }}
        transition={{ duration: 0 }}
        className="w-7 h-[2px] bg-white rounded-full"
      />
      <motion.div
        animate={
          clicked ? { rotate: "-45deg", y: "-1px" } : { rotate: 0, y: 0 }
        }
        className="w-7 h-[2px] bg-white rounded-full"
      />
    </div>
  );
}

export default Burger;
