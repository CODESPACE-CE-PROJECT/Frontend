export const ProblemConstraint = () => {
     return <div className="flex flex-row gap-x-16 w-full px-9 py-3 bg-[#3A1617] rounded-xl">
          <p className="text-xl font-bold">ข้อจำกัด</p>
          <div className="flex flex-col items-center justify-center">
               <ul style={{listStyleType: 'inherit'}} className="text-lg">
                    <li>ห้ามใช้ while loop</li>
                    <li>ห้ามใช้ for loop</li>
               </ul>
          </div>
     </div>
}