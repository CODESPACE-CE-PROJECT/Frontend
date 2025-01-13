"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // using next/navigation for the params hook
import { getProblemById } from "../../../../../services/problem.service"; // API service for fetching data
import Image from "next/image";
import Description from "@/app/components/Description";
import TextEditter from "@/app/components/TextEditter";
import TestCase from "@/app/components/TestCase";
import Home from "@/app/page";
import HomeworkNav from "@/app/components/HomeworkNav";
import axios from "axios";
import ListIcon from '@mui/icons-material/List';



export default function AssignmentPage() {
  const params = useParams<{courseId: string,problemId: string}>(); // Accessing dynamic route params
  const problemId = params.problemId; // Get problemId from the URL

  const [assignmentDetails, setAssignmentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      if (!problemId) return;
      setLoading(true);
      try {
        const data = await getProblemById(problemId);
        if (data?.data) {
          setAssignmentDetails(data.data);
        }
      } catch (err: any) {
        console.error("Error fetching assignment details:", err);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchAssignmentDetails();
  }, [problemId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
       {/* Popup */}
      {/* <HomeworkNav /> */}
      {/* Popup */}

      <div className="text-white text-2xl ml-4 mb-5">

        ทดสอบความรู้เบื้องต้น
      </div>

      <button className="flex items-center gap-2 px-2 py-3 mb-5 ml-4 text-white bg-[#161f2e] rounded-lg hover:bg-[#1e2a3b] ">
        <ListIcon />
        <span>โจทย์ปัญหา</span>
      </button>


      <div className="flex flex-row">
        
        <div className="flex flex-col w-8/12 pl-4">
          <div className="">
            <Description />
          </div>
          <div className="pt-5">
            <TestCase />
          </div>
        </div>

        <div className=" pr-4 ml-5">
          <TextEditter />
        </div>
      </div>

    </>
  );
}
