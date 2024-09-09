import React, { useState } from 'react';

import DoneIcon from '@mui/icons-material/Done';
import CreateIcon from '@mui/icons-material/Create';

export default function AccountSettings() {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateEmail = () => {
    // Add your update email logic here
    setIsEditingEmail(false);
  };

  const handleCancelEmail = () => {
    setIsEditingEmail(false);
    setNewEmail("");
    setConfirmEmail("");
  };

  const handleUpdatePassword = () => {
    // Add your update password logic here
    setIsEditingPassword(false);
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <h1 className="text-2xl mb-3 text-white">บัญชีผู้ใช้งาน</h1>
      <div className="bg-[#1C2333] p-6 rounded-lg shadow-md mb-6">
        <form>
          {isEditingEmail ? (
            <>
              <div className="mb-4">
                <h2 className="block text-lg font-medium text-white mb-2">
                  อัปเดตอีเมลของคุณ
                </h2>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white">
                      อีเมล์ใหม่
                    </label>
                    <input
                      className="w-full mt-2 px-3 py-2 bg-[#1C2333] border-2 border-[#3C445C] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="your@gmail.com"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white ">
                      ยืนยันอีเมล์ใหม่
                    </label>
                    <input
                      className="w-full mt-2 px-3 py-2 bg-[#1C2333] border-2 border-[#3C445C] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      placeholder="your@gmail.com"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  
                  onClick={handleCancelEmail}
                  className="px-3 py-1 text-sm bg-white rounded-md hover:bg-red-600"
                >
                  ยกเลิก
                </button>
                <button
                 
                  onClick={handleUpdateEmail}
                  className="flex items-center px-3 py-1 text-sm text-white bg-[#0053A6] rounded-md hover:bg-green-600"
                >
                  <DoneIcon  className="mr-1" />
                  อัพเดต
                </button>
              </div>
            </>
          ) : (
            <div className="mb-4">
              <h1 className="block text-lg font-medium text-white">
                อีเมล์
              </h1>
              <div className="flex items-center justify-between">
                <div className="text-white">
                  64010726@kmitl.ac.th
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(true)}
                  className="ml-2 flex items-center px-3 py-1 text-sm text-white bg-[#1C2333] border-2 border-[#3C445C] rounded-md hover:bg-[#3C445C] focus:outline-none"
                >
                  <CreateIcon fontSize="small" className="mr-1" />
                  <div>แก้ไข</div>
                </button>
              </div>
            </div>
          )}

          {isEditingPassword ? (
            <>
              <div className="mb-4">
                <h2 className="block text-lg font-medium text-white mb-2">
                  อัปเดตรหัสของคุณ
                </h2>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white" htmlFor="newPassword">
                      รหัสใหม่
                    </label>
                    <input
                      className="w-full mt-2 px-3 py-2 bg-[#1C2333] border-2 border-[#3C445C] rounded-md hover:bg-[#3C445C] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="รหัสใหม่"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white" htmlFor="confirmPassword">
                      ยืนยันรหัสใหม่
                    </label>
                    <input
                      className="w-full mt-2 px-3 py-2 bg-[#1C2333] border-2 border-[#3C445C] rounded-md hover:bg-[#3C445C] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="ยืนยันรหัสใหม่"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  
                  onClick={handleCancelPassword}
                  className="px-3 py-1 text-sm bg-white rounded-md hover:bg-red-600"
                >
                  ยกเลิก
                </button>
                <button
                  
                  onClick={handleUpdatePassword}
                  className="flex items-center px-3 py-1 text-sm text-white bg-[#0053A6] rounded-md hover:bg-green-600"
                >
                  <DoneIcon  className="mr-1" />
                  อัพเดต
                </button>
              </div>
            </>
          ) : (
            <div className="mb-4">
              <h1 className="block font-medium text-white text-lg">
                รหัส
              </h1>
              <div className="flex items-center justify-between">
                <div className="text-white">
                  *****************
                </div>
                <button
                  
                  onClick={() => setIsEditingPassword(true)}
                  className="ml-2 flex items-center px-3 py-1 text-sm text-white bg-[#1C2333] border-2 border-[#3C445C] rounded-md hover:bg-[#3C445C] focus:outline-none"
                >
                  <CreateIcon fontSize="small" className="mr-1" />
                  <div>แก้ไข</div>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
