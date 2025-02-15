"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import FileExplorer from "@/components/Editor/FileExplorer";
import WorkSpaceEditor from "@/components/Editor/WorkSpaceEditor";
import WorkSpaceTerminal from "@/components/Editor/WorkSpaceTerminal";
import InputOutput from "@/components/Editor/InputOutput";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { PackageType } from "@/enum/enum";
import { Loading } from "@/components/Loading/Loading";

export default function Page() {
  const [sourceCode, setSourceCode] = useState("");
  const [input, setInput] = useState("");
  const [showOutput, setShowOutput]: any = useState("");
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      setLoading(false);
    };
    fetchData();
  });

  const sendCode = () => {
    axios
      .post("https://compiler-api.unixvextor.com/compiler/", {
        sourceCode: sourceCode,
        language: "cpp",
        input: input,
      })
      .then(
        (response) => {
          if (process.env.NODE_ENV === "development") {
            console.log(response.data);
          }
          setShowOutput(response.data);
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
          }
        }
      );
  };

  const onChange: any = (value: string, ev: any[]) => {
    setSourceCode(value);
  };

  const handleOnClick = () => {
    if (process.env.NODE_ENV === "development") {
      console.log("Button clicked");
    }
    sendCode();
  };

  const isPremium = profile?.school?.package === PackageType.PREMIUM; // check is PREMIUM package

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full ">
          <Loading className="size-20" />
        </div>
      ) : (
        <>
          <FileExplorer isPremium={isPremium} />
          <WorkSpaceEditor />
          {isPremium ? <WorkSpaceTerminal /> : <InputOutput />}
        </>
      )}
    </>
  );
}
