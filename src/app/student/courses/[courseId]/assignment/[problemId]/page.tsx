"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // using next/navigation for the params hook
import { getProblemById } from "../../../../../services/problem.service"; // API service for fetching data

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
      {/* Display the assignment details */}
      <div>
        <h1 className="text-white text-2xl mb-4">{assignmentDetails?.title}</h1>
        <p className="text-white">{assignmentDetails?.description}</p>  
        {/* More details about the assignment can go here */}
      </div>
    </>
  );
}
