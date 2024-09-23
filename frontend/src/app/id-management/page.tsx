
import ConnectedAccount from "@/app/id-management/components/ConnectedAccount";
import ConnectedPlatsApp from "@/app/id-management/components/ConnectedPlatsApp";
import YourUnifiedIdProfile from "@/app/id-management/components/YourUnifiedIdProfile";



import React, { useEffect } from "react";
import Banner from "@/app/id-management/components/Banner";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequest/account";

export default async function IdManagement ()  {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const response = await accountApiRequest.user(accessToken?.value ?? "");
  console.log("🚀 ~ IdManagement ~ response:", response?.data?.data)


  return (
    <div className="h-[100vh] w-full flex flex-col items-center  gap-10 text-white  ">
      {/* Banner */}
      <Banner platId={response?.data?.data?.user?.plat_id}/>
      

      {/* Profile */}
      <div className="w-full h-full bg-[url('/BackgroundProfile.png')] bg-no-repeat bg-cover bg-center">
      <div className="max-w-screen-xl w-full mx-auto pt-[100px] flex lg:flex-row flex-col gap-[43px] px-5 ">
        <ConnectedAccount user={response?.data?.data?.user} />

        <div className="flex flex-col gap-8 lg:max-w-[706px] w-full">
          <YourUnifiedIdProfile />

          <ConnectedPlatsApp />
        </div>
      </div>
      </div>

      
    </div>
  );
};

