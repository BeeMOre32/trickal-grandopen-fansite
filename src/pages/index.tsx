import { getLeftTimeTo202309271200 } from "@/constants/leftTime";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SiNaver } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import UserCount from "@/component/user-count";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export default function Home() {
  const { data: userCount, isLoading } = useQuery(
    ["getUsers"],
    async () => {
      return await (
        await axios.get("/api/getUserCount")
      ).data.data;
    },
    {
      refetchInterval: 1000 * 10,
      onSuccess: (data) => {
        if (userCount === undefined) return;
        setPrevUserCount(parseInt(userCount));
      },
    },
  );

  const [countDownTime, setCountDownTime] = React.useState<any>();
  const [prevUserCount, setPrevUserCount] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountDownTime(getLeftTimeTo202309271200);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen  text-center font-sans`}
    >
      <div className="flex justify-center gap-3 sm:gap-8 flex-col items-center">
        <motion.img
          src="/main-logo.png"
          alt="main-logo"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            type: "spring",
          }}
        />
        <div className="max-sm:p-0 max-sm:min-w-[75%] lg:p-6  rounded-md flex justify-center flex-col gap-6 shadow-[5px_5px_50px_rgba(47,46,60,1)] bg-[#ecd9ba] border-4 border-[#391e0e]">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-center sm:text-2xl text-xl leading-8 text-[#391e0e] font-extrabold ">
                현재 트릭컬에 등록한 교주님들
              </h1>

              <span className="text-3xl text-[#391e0e] font-bold flex justify-center items-center">
                {isLoading ? (
                  <p className="animate-pulse w-12 h-5 bg-[#391e0e] rounded-md" />
                ) : (
                  <UserCount
                    from={prevUserCount ?? 0}
                    to={
                      userCount !== undefined
                        ? parseInt(userCount.replace(/,/g, ""))
                        : 0
                    }
                  />
                )}
                명
              </span>
            </div>
            <h1 className="text-center sm:text-3xl text-xl leading-8 text-[#391e0e] font-extrabold ">
              트릭컬 오픈까지 남은 시간
            </h1>
          </div>
          <div className="flex justify-around sm:px-4 mb-4">
            <div className="flex flex-col justify-center items-center gap-3">
              <span className="flex justify-center items-centerbg-inherit text-[#391e0e] text-3xl font-semibold rounded-md">
                {countDownTime?.diffDays.toFixed(0)}
              </span>
              <span className="text-sm text-[#391e0e] font-bold">일</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <span className="bg-inherit text-[#391e0e] text-3xl font-semibold rounded-md">
                {countDownTime?.diffHours.toFixed(0)}
              </span>
              <span className="text-sm text-[#391e0e] font-bold">시간</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <span className="bg-inherit text-[#391e0e] text-3xl font-semibold rounded-md">
                {countDownTime?.diffMinutes.toFixed(0)}
              </span>
              <span className="text-sm text-[#391e0e] font-bold">분 </span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <span className="bg-inherit  text-[#391e0e] text-3xl font-semibold rounded-md">
                {countDownTime?.diffSeconds.toFixed(0)}
              </span>
              <span className="text-sm text-[#391e0e] font-bold">초 </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[#391e0e] text-sm font-bold flex gap-3 items-center mt-10">
        <span>
          이 사이트는 트릭컬의 공식 사이트가 아닙니다. <br />
        </span>
        <Link
          href="https://github.com/BeeMOre32/trickal-grandopen-fansite"
          target="_blank"
        >
          <BsGithub size={40} className="inline-block" />
        </Link>
      </p>

      <motion.div className="xl:absolute top-1/2 bottom-1/2 right-10 z-1 max-sm:hidden">
        <div className="flex flex-col items-center justify-center gap-5 bg-[#ecd9ba] p-3 rounded shadow-2xl border-4 border-[#391e0e]">
          <Link href="https://cafe.naver.com/trickcal">
            <SiNaver size={30} />
          </Link>
          <Link href="https://twitter.com/Trickcal_Re">
            <FaXTwitter size={30} />
          </Link>
          <Link href={`https://arca.live/b/trickcal`}>
            <Image src="/icon.png" alt="main-logo" width="30" height="30" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
