export const SubmissionTable = () => {
     return <div className="w-full">
     <div className="table w-full rounded-xl">
          <div className="table-header-group bg-[#3049724D] w-full">
               <div className="table-row text-xl font-medium">
                    <div className="table-cell text-center align-middle rounded-l-xl px-8 py-4">ครั้งที่</div>
                    <div className="table-cell text-center align-middle px-8 py-4">วันเวลาที่ส่ง</div>
                    <div className="table-cell text-center align-middle py-4 rounded-r-xl">สถานะ</div>
               </div>
          </div>

          <div className="table-row-group w-full">
               <div className="table-row w-full">
                    <div className="table-cell align-middle py-2" />
               </div>
               {Array.from({length: 20}).map((item, index) => (
                    <div className="table-row w-full hover:bg-gray-600 hover:bg-opacity-15 text-center cursor-pointer text-lg" key={index}>
                         <div className="table-cell align-middle p-4">{index + 1}</div>
                         <div className="table-cell align-middle p-4">20/10/2024 14.00</div>
                         <div className="table-cell align-middle p-4 text-green-l font-medium">ผ่าน</div>
                    </div>
               ))}
          </div>
     </div>
</div>
}