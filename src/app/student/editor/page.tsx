"use client";

import React, { useEffect, useState } from "react";
import FileExplorer from "@/components/Editor/FileExplorer";
import WorkSpaceEditor from "@/components/Editor/WorkSpaceEditor";
import WorkSpaceTerminal from "@/components/Editor/WorkSpaceTerminal";
import InputOutput from "@/components/Editor/InputOutput";
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

export default function Page() {
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState(true);
  const [codeFile, setCodeFile] = useState<ICodeSpace[]>();
  const [editState, setEditState] = useState<{
    isLoading: boolean;
    codeSpaceId?: string;
  }>({
    isLoading: false,
  });
  const [selectedFile, setSelectedFile] = useState<ICodeSpace>();

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
      setSelectedFile(codeFile[0])
      setLoading(false);
    };
    fetchData();
  }, []);

  const isPremium = profile?.school?.package === PackageType.PREMIUM; // check is PREMIUM package

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full ">
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
            onSelect={(file) => setSelectedFile(file) }
            selectedFile={selectedFile}
          />
          <WorkSpaceEditor codeFile={selectedFile} />
          {isPremium ? <WorkSpaceTerminal /> : <InputOutput />}
        </>
      )}
    </>
  );
}
