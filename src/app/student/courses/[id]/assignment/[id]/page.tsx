"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // using next/navigation for the params hook
import { getAssignment } from "../../../../../services/user.service"; // API service for fetching data

export default function AssignmentPage() {
  const params = useParams(); // Accessing dynamic route params
  const courseId = params.id; // Get courseId from the URL
  const problemId = params.problemId; // Get problemId from the URL

  const [assignmentDetails, setAssignmentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      if (!courseId || !problemId) return;
      setLoading(true);
      try {
        const data = await getAssignment(courseId as string, problemId as string);
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
  }, [courseId, problemId]);

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
