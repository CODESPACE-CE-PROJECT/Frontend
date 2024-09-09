import React from 'react';

import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileSettings() {
  return (
    <>
      <h1 className="text-2xl mb-3 dark:text-gray-200">โปรไฟล์</h1>
      <div className="bg-[#191F2D] p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-start space-x-14 ">
          <div className="relative pr-4 ml-4">
            <img
              src="https://s3-alpha-sig.figma.com/img/5e9c/105e/930aea22bd61806331b237ae5a782e5b?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=helOIN69pRTbSNNQptLPOiom6g~HkbbGNVRQ8IFAWSulyLvzwiqyiNLEEllf3qZ8VvS60fuv9jkYKGq5HKSTX9HrF3VmszU2nOgUsDoF-isMsL1ORvo~rO-CapaUlTAhugGUur--Nc5jbCst9iUprdJ8hXtrzWhOXzDDe4thGXn5GGZU5W4h7w53Vx4RCCYyQgnnfO3FqKGJYU~J~4VIMqlyGcSLRAM1FxVB9iSevtmMdzGPungk1~FT6zW5WcxjFBS5LfnLawTB4G-h9jAdMS29siCH2x4WaM3oRmyS1wrFMynYWtlB7SdyGDiuDcW24eNOe5~qxTQuVRWvns~W7A__"
              className=" static w-54 h-54 rounded-full border border-gray-300"
            />
            <button className=" absolute bottom-0 right-0 bg-[#161A22] text-white text-sm py-2 px-4 rounded-md hover:bg-[#242935] border-2 border-[#30363D]">
              <EditIcon sx={{ fontSize: 14 }} className='mr-1'/>แก้ไข
            </button>
          </div>

          <div className="w-2/3">

            <form>
              <div className="mb-3">
                <label htmlFor="username" className="block text-sm font-medium text-white">ชื่อผู้ใช้งาน</label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white">ชื่อจริง</label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white">นามสกุล</label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white">โรงเรียน/สถาบัน</label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex space-x-4 justify-end">
                <button
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  ยกเลิก
                </button>

                <button
                  className="bg-[#0053A6] text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center space-x-2"
                >

                  <DoneIcon />
                  <div>บันทึกโปรไฟล์</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
