import AddIcon from '@/assets/AddIcon'
import DeleteIcon from '@/assets/DeleteIcon'
import GoogleIcon from '@/assets/GoogleIcon'
import TelegramIcon from '@/assets/TelegramIcon'
import TwitterIcon from '@/assets/TwitterIcon'
import WalletIcon from '@/assets/WalletIcom'
import ConnectAccountModal from '@/components/ConnectAccountModal'

import React from 'react'

const ConnectedAccount = () => {
  return (

    <div className="relative w-full">
    <div className="absolute inset-0 rounded-xl  from-[#190532] opacity-15"
    style={{
      background: "linear-gradient(90deg, rgba(25,5,50,1),rgba(102,255,255,1) 0%)"
    }}
    ></div>
    <div className="relative z-10  flex flex-col gap-8 p-5 ">
   
    <p className="text-xl text-[#3AE7E7] font-semibold">
      Connected Account
    </p>
    <div className="flex flex-col gap-3">
      <div className="bg-[#1E2536] flex items-center py-[18px] px-[10px] gap-[20px] rounded-[8px] box-gradient-border-mask">
        <div className="flex items-center gap-2">
          <WalletIcon/>
          <p>9SsNLjgGK1dUbdPKqrSyaZ5GhPY5355Jcdjk8f81SqiH</p>
        </div>

        <div className="flex gap-3">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[4px] after:end-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#8737E9] to-[#3AE7E7]"></div>
          </label>
          <DeleteIcon />
        </div>
      </div>
      <div className="bg-[#1E2536] flex items-center justify-between py-[18px] px-[10px] gap-[20px] rounded-[8px] box-gradient-border-mask">
        <div className="flex items-center gap-2">
          <GoogleIcon />
          <p>@dustinhuynh</p>
        </div>

        <div className="flex gap-3">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[4px] after:end-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#8737E9] to-[#3AE7E7]"></div>
          </label>
          <DeleteIcon />
        </div>
      </div>
      <div className="bg-[#1E2536] flex items-center justify-between py-[18px] px-[10px] gap-[20px] rounded-[8px] box-gradient-border-mask">
        <div className="flex items-center gap-2">
          <TelegramIcon />
          <p>@dustinhuynh</p>
        </div>

        <div className="flex gap-3">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[4px] after:end-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#8737E9] to-[#3AE7E7]"></div>
          </label>
          <DeleteIcon />
        </div>
      </div>
      <div className="bg-[#1E2536] flex items-center justify-between py-[18px] px-[10px] gap-[20px] rounded-[8px] box-gradient-border-mask">
        <div className="flex items-center gap-2">
          <TwitterIcon />
          <p>@dustinhuynh</p>
        </div>

        <div className="flex gap-3">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[4px] after:end-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#8737E9] to-[#3AE7E7]"></div>
          </label>
          <DeleteIcon />
        </div>
      </div>


    </div>
    <ConnectAccountModal/>

  </div>
    </div>



    
  )
}

export default ConnectedAccount