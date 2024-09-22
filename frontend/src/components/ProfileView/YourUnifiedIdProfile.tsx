import EthereumIcon from "@/assets/EthereumIcon";
import React from "react";

const YourUnifiedIdProfile = ({ data }: { data: any }) => {
  return (
    <div className="relative w-full ">
      <div
        className="absolute inset-0 rounded-xl opacity-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(25,5,50,1),rgba(102,255,255,1) 0%)",
        }}
      ></div>
      <div className="relative   flex flex-col gap-8 p-5 ">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl text-[#3AE7E7] font-semibold">
            Your Unified ID Profile
          </p>

          <EthereumIcon />
        </div>
        <div className="flex sm:flex-row flex-col gap-2  max-w-[667px] w-full">
          <div className="group gradient-border-mask  md:w-[200px]  w-full  flex flex-col gap-2 text-center py-3  bg-[#1A1A36] hover:bg-[#060625] cursor-pointer rounded-[12px]">
            <p className="text-[40px] font-bold group-hover:text-[#3AE7E7]">
              {Number(data?.balance) >= 0
                ? Number(data?.balance).toFixed(1)
                : "- -"}
            </p>
            <p className="text-[17px] text-[#B7B4BB] group-hover:text-white">
              Your balance
            </p>
          </div>
          <div className="group gradient-border-mask md:w-[200px]  w-full flex flex-col gap-2 text-center py-3  bg-[#1A1A36] hover:bg-[#060625] cursor-pointer rounded-[12px]">
            <p className="text-[40px] font-bold group-hover:text-[#3AE7E7]">
              {Number(data?.volume) >= 0
                ? Number(data?.volume).toFixed(1)
                : "- -"}
            </p>
            <p className="text-[17px] text-[#B7B4BB] group-hover:text-white">
              One month volume
            </p>
          </div>
          <div className="group gradient-border-mask  md:w-[200px] w-full  flex flex-col gap-2 text-center py-3  bg-[#1A1A36] hover:bg-[#060625] cursor-pointer rounded-[12px]">
            <p className="text-[40px] font-bold group-hover:text-[#3AE7E7]">
              {Number(data?.twitter) >= 0
                ? Number(data?.twitter).toFixed(1)
                : "- -"}
            </p>
            <p className="text-[17px] text-[#B7B4BB] group-hover:text-white">
              Twitter Scores
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourUnifiedIdProfile;
