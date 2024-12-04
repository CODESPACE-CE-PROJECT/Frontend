import description from "../../../src/app/assets/HomeworkAssets/Descriptionicon.svg";
import Image from 'next/image';

export default function Description() {
    return (
        <div>
            
            <div className="p-2 pt-0 border border-[#2A3A50] text-xl text-[#C2C8CC] rounded-b-lg  rounded-t-lg">
                <div className="text-white pt-5 pl-4 pr-4">
                    <h2 className=" font-bold mb-4 text-white text-center">โปรแกรมหาค่ากำลังสอง</h2>
                    <p className="leading-7 mb-6">
                    เขียนโปรแกรมที่รับจำนวนเต็มบวกสองตัว [a, b] จากผู้ใช้ ซึ่งตัวแรกคือ ฐาน และตัวที่สองคือ เลขชี้กำลัง แล้วคำนวณค่า a^b
                    </p>
                    

                </div>
            </div>
        </div>
    );
}
