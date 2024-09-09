"use client";

import Image from 'next/image'
import Description from "../components/Description";
import TextEditter from "../components/TextEditter";
import TestCase from "../components/TestCase";
import React, { useState } from 'react';
import Home from '../page';
import HomeworkNav from "../components/HomeworkNav";
export default function HomeWorkSpace() {



  return (
    <>

          {/* Popup */}
          <HomeworkNav/>
          {/* Popup */}

      <div className="flex">
        <div className=" w-9/12	pl-4 pb-5">
          <Description />
        </div>
        <div className="flex flex-col pr-4 ">
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

