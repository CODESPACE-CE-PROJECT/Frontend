"use client";

import React, { useEffect, useRef, useState } from "react";
import FileExplorer from "@/components/Workspace/FileExplorer";
import WorkSpaceEditor from "@/components/Workspace/WorkSpaceEditor";
import { WorkSpaceTerminal } from "@/components/Workspace/WorkSpaceTerminal";
import { InputOutput } from "@/components/Workspace/InputOutput";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { LanguageType, PackageType } from "@/enum/enum";
import { Loading } from "@/components/Loading/Loading";
import {
  ICodeSpace,
  ICreateCodeSpace,
  IUpdateCodeSpace,
} from "@/types/codeSpace";
import {
  createFileCodeSpace,
  getCodeSpace,
  updateFileCodeSpace,
  deleteFileCodeSpace,
} from "@/actions/codeSpace";
import { NotifyType } from "@/enum/enum";
import { notify, updateNotify } from "@/utils/toast.util";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getCookie } from "cookies-next/client";
import { compileCode } from "@/actions/compiler";
import { ICompileCode } from "@/types/compile";
import { getRealTimeURL, getTerminalStreamURL } from "@/actions/env";
import { Socket, io } from 'socket.io-client'

export default function Page() {
  const [profile, setProfile] = useState<IProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [codeFile, setCodeFile] = useState<ICodeSpace[]>();
  const [selectedFile, setSelectedFile] = useState<ICodeSpace>();
  const [socket, setSocket] = useState<Socket | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const [output, setOutput] = useState<string>()
  const [input, setInput] = useState<string>()
  const accessToken = getCookie('accessToken')

  const [editState, setEditState] = useState<{
    isLoading: boolean;
    codeSpaceId?: string;
  }>({
    isLoading: false,
  });

  const createNewFile = async () => {
    const newFile: ICreateCodeSpace = {
      filename: `untitled.py`,
      language: LanguageType.PYTHON,
      sourceCode: "",
    };

    const notifyId = notify(NotifyType.LOADING, "กำลังสร้างไฟล์");
    if (notifyId) {
      const response = await createFileCodeSpace(newFile);
      if (response.status === 201) {
        const codeFile: ICodeSpace[] = await getCodeSpace();
        setCodeFile(codeFile);
        localStorage.setItem(`fileCach-${profile?.username}`, JSON.stringify(selectedFile))
        updateNotify(notifyId, NotifyType.SUCCESS, "สร้างไฟล์สำเร็จ");
      } else {
        updateNotify(
          notifyId,
          NotifyType.ERROR,
          "เกิดข้อผิดผลาดในการสร้างไฟล์"
        );
      }
    }
  };

  const renameFile = async (
    codeSpaceId: string,
    updatedFile: IUpdateCodeSpace
  ) => {
    setEditState({
      isLoading: true,
      codeSpaceId: codeSpaceId,
    });
    const notifyId = notify(NotifyType.LOADING, "กำลังเปลี่ยนชื่อไฟล์");
    if (notifyId) {
      const response = await updateFileCodeSpace(codeSpaceId, updatedFile);
      if (response.status === 200) {
        updateNotify(notifyId, NotifyType.SUCCESS, "เปลี่ยนชื่อไฟล์สำเร็จ");
        const codeFile: ICodeSpace[] = await getCodeSpace();
        localStorage.setItem(`fileCach-${profile?.username}`, JSON.stringify(selectedFile))
        setCodeFile(codeFile);
        setEditState({
          isLoading: false,
          codeSpaceId: codeSpaceId,
        });
      } else {
        updateNotify(
          notifyId,
          NotifyType.ERROR,
          "เกิดข้อผิดผลาดในการเปลี่ยนชื่อไฟล์"
        );
        setEditState({
          isLoading: false,
          codeSpaceId: codeSpaceId,
        });
      }
    }
  };

  const deleteFile = async (codeSpaceId: string) => {
    const notifyId = notify(NotifyType.LOADING, "กำลังลบไฟล์");
    if (notifyId) {
      const response = await deleteFileCodeSpace(codeSpaceId);
      if (response.status === 200) {
        updateNotify(notifyId, NotifyType.SUCCESS, "ลบไฟล์สำเร็จ");
        const codeFile: ICodeSpace[] = await getCodeSpace();
        setCodeFile(codeFile);
      } else {
        updateNotify(notifyId, NotifyType.ERROR, "เกิดข้อผิดผลาดในการลบไฟล์");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const profile: IProfile = await getProfile();
      const codeFile: ICodeSpace[] = await getCodeSpace();
      setProfile(profile);
      setCodeFile(codeFile);
      const fileCache = localStorage.getItem(`fileCach-${profile.username}`)
      if (fileCache) {
        setSelectedFile(JSON.parse(fileCache))
      }else {
        if(codeFile.length > 0){
          setSelectedFile(codeFile[0])
          localStorage.setItem(`fileCach-${profile.username}`, JSON.stringify(codeFile[0]))
        }
      }

      if(profile.school.package === PackageType.STANDARD){
        const realTimeURL = await getRealTimeURL()
        await fetchEventSource(`${realTimeURL}/compiler`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          async onopen(response) {
            if (response.ok) {
              setIsLoading(false)
            }
          },
          async onmessage(ev) {
            if (ev.data === "ok") {
              console.log("compiler connected")
            } else {
              setOutput(JSON.parse(ev.data).result)
            }
          },
        });
      } else if (profile.school.package === PackageType.PREMIUM){
        const terminalStreamURL = await getTerminalStreamURL();
        
        if(!socketRef.current){
          const sockerTeminal = io(terminalStreamURL, {
            transports: ["websocket"],
            autoConnect: false,
          })
          await sockerTeminal.connect()
          socketRef.current = sockerTeminal
          
          setSocket(sockerTeminal)
          
          sockerTeminal.on('connect', () => {
            console.log("Terminal Stream connnect")
          })

          sockerTeminal.on('init', (msg) => {
            console.log(msg)
            setIsLoading(false)
          })

          sockerTeminal.on('error', (err) => {
            console.log("socket error:", err)
          })
        }
      }
    };
    fetchData();
    
    return () => {
      if(socketRef.current){
        socketRef.current.disconnect()
        socketRef.current = null;
      }
    }
  }, [accessToken]);

  const isPremium = profile?.school?.package === PackageType.PREMIUM;

  const handleExecuteStandardPackage = async () => {
    const id = notify(NotifyType.LOADING, "กำลังประมวลผล")
    if (id && selectedFile) {
      const updateForm: IUpdateCodeSpace = {
        filename: selectedFile.fileName,
        language: selectedFile.language,
        sourceCode: selectedFile.sourceCode
      }
      const { status } = await updateFileCodeSpace(selectedFile?.codeSpaceId, updateForm);
      if (status === 200 && profile) {
        const submitCode: ICompileCode = {
          fileName: selectedFile.language === LanguageType.JAVA ? 'Main' : '',
          input: input || "",
          language: selectedFile.language,
          sourceCode: selectedFile.sourceCode,
          username: profile?.username
        }
        localStorage.setItem(`fileCach-${profile.username}`, JSON.stringify(selectedFile))
        const { status } = await compileCode(submitCode)
        if (status === 200) {
          updateNotify(id, NotifyType.SUCCESS, "ประมวลผลเสร็จสิ้น")
        } else {
          updateNotify(id, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการประมวลผล')
        }
      } else {
        updateNotify(id, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการประมวลผล')
        return;
      }

    }
  }

  const handleExecutePremiumPackage = async () => {
    if(selectedFile){
      const payload = {
        sourceCode: selectedFile?.sourceCode,
        language: selectedFile?.language,
        fileName: selectedFile?.language === LanguageType.JAVA ? selectedFile.fileName.split('.')[0]: '' 
      }
      if(socket?.connected){
        socket.emit('runCode', payload)
      }
      const updateForm: IUpdateCodeSpace = {
        filename: selectedFile.fileName,
        language: selectedFile.language,
        sourceCode: selectedFile.sourceCode
      }
      const { status } = await updateFileCodeSpace(selectedFile?.codeSpaceId, updateForm);
      if (status === 200 && profile) {
        localStorage.setItem(`fileCach-${profile.username}`, JSON.stringify(selectedFile))
      } else {
        return;
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full w-full ">
          <Loading className="size-20" />
        </div>
      ) : (
        <>
          <FileExplorer
            codeFile={codeFile}
            isPremium={isPremium}
            onCreateFile={createNewFile}
            onEditFile={(codespaceId, editFile) =>
              renameFile(codespaceId, editFile)
            }
            onDeleteFile={(codespaceId) => deleteFile(codespaceId)}
            editState={editState}
            onSelect={(file) => setSelectedFile(file)}
            selectedFile={selectedFile}
            onExecute={() => isPremium ? handleExecutePremiumPackage() : handleExecuteStandardPackage()}
          />
          <WorkSpaceEditor
            codeFile={selectedFile}
            onChange={(value) =>
              setSelectedFile((prev) => {
                if (!prev) return undefined;
                return {
                  ...prev,
                  sourceCode: value || ""
                };
              })}
          />
          {
            isPremium ?
              <WorkSpaceTerminal socket={socketRef.current}/> :
              <InputOutput onInputChange={(value) => setInput(value)} output={output} />
          }
        </>
      )}
    </>
  );
}
