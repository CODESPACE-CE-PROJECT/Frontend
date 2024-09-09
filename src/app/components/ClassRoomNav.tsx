"use client"; // Add this line at the top

export default function ClassRoomNav() {
  return (
    <>
      <div className="w-full relative bg-[#0E1525]">
        <div className="flex  text-[#FAFAFA] pl-12 pt-8 space-x-10">
          <div className="z-10 border-[#6AACCE] border-b-4 pb-4 px-6">
            General
          </div>
          <div className="z-10 border-[#6AACCE] hover:border-b-4 pb-4 px-6">
            Assignment
          </div>
          <div className="z-10 border-[#6AACCE] hover:border-b-4 pb-4 px-6">
            Announcements
          </div>
          <div className="z-10 border-[#6AACCE] hover:border-b-4 pb-4 px-6">
            People
          </div>
        </div>
        <span className="z-0 absolute bottom-0 bg-[#E1E1E1] p-[1px] w-full"></span>
      </div>
    </>
  );
}
