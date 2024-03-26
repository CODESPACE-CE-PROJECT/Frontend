import description from "../../../src/app/assets/HomeworkAssets/Descriptionicon.svg"
import Image from 'next/image'

export default function Description() {

    return (
        <>
            <div>
                <div className="bg-[#161e2e] 	 rounded-t-lg text-[#a2a5ab] flex flex-row pt-1 pb-1 pl-2 ">
                    <Image src={description} alt="" className="w-4" />
                    <div className="pl-2">Description</div>
                </div>
                <div className="p-2 pt-0 bg-[#1c2333] text-xl text-[#C2C8CC] rounded-b-lg pl-2 h-screen ">
                    <div className="text-white pt-5 pl-4 ">
                        1.หาพื้นที่สี่เหลี่ยม
                    </div>
                </div>
            </div>

        </>




    )


}
