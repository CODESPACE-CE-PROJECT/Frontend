import React, { useState } from "react";
import Image from "next/image";
import Hamburger from "../../app/assets/CommonAssets/Hamburger.svg";
import WindowsIcon from "../../app/assets/CommonAssets/WindowsIcon.svg";
import RunArrow from "../../app/assets/CommonAssets/RunArrow.svg";

export default function WorkHeadNav() {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row space-x-5 ml-8">
          <Image src={WindowsIcon} alt=""></Image>
          <Image src={Hamburger} alt=""></Image>
        </div>

        <button className="flex flex-row rounded-md items-center bg-[#068632] space-x-3 px-4 py-2">
          <div className="text-white text-lg font-bold">Run</div>
          <Image className="w-2" src={RunArrow} alt=""></Image>
        </button>
      </div>
    </>
  );
}
