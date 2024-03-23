"use client";

import CodeIcon from "../../../src/app/assets/HomeworkAssets/Vector.svg"
import Image from 'next/image'
import windows from "../../../src/app/assets/HomeworkAssets/windows.svg"
import Group from "../../../src/app/assets/HomeworkAssets/Group.svg"
import Description from "../components/Description";
import TextEditter from "../components/TextEditter";
import TestCase from "../components/TestCase";
export default function HomeWorkSpace() {

  return (
    <>

      <div className="">
        <div className="flex flex-row  m-1 mr-5 ">
          <button>
            <Image src={windows} alt="" />
          </button>
          <button>
            <Image src={Group} alt="" />
          </button>

          <div className="flex justify-end">
            <div className=" justify-end m-1 mr-5 ">
              <button className="w-20 h-10  text-white bg-[#068632] rounded-md pl-2">
                Run▸
              </button>
            </div>


            <div className=" justify-end m-1 ">

              <button className="w-28 h-10 text-[#48C84D] border-solid border-2 border-[#48C84D] rounded-md flex pt-2 pl-2 font-bold">
                <Image src={CodeIcon} alt="" />
                <div className="px-3">
                  Submit
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>




      <div className="flex">
        <div className=" w-9/12	pl-4 pb-5">
          <Description />
        </div>
        <div className="flex flex-col pr-4 h-full">
          <div className="pl-4">
            <TextEditter />
          </div>
          <div className="pl-4 pt-5 ">
            <TestCase />
          </div>
        </div>

      </div>

      




    </>
  );
}
