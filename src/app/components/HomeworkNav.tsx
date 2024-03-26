import Image from "next/image";
import Hamburger from "../../app/assets/CommonAssets/Hamburger.svg";
import WindowsIcon from "../../app/assets/CommonAssets/WindowsIcon.svg";
import RunArrow from "../../app/assets/CommonAssets/RunArrow.svg";
import ProbNav from "./ProbNav";
import submiticon from "../../app/assets/CommonAssets/SubmitIcon.svg"
export default function WorkHeadNav() {
    return (
        <>

            <div className="flex flex-row justify-between items-center m-2">
                <div className="flex flex-row ml-7 space-x-4 ">
                    <Image className="" src={WindowsIcon} alt=""></Image>
                    <ProbNav />
                </div>


                <div className="flex flex-row space-x-3 mr-4 ">
                    <button className="flex flex-row rounded-md items-center bg-[#068632] px-4 py-2">
                        <div className="text-white text-lg font-bold">Run</div>
                        <Image className="ml-3 w-2" src={RunArrow} alt=""></Image>
                    </button>

                    <button className="flex flex-row  items-center border-2 border-[#48C84D] rounded-md px-0.5 py-2 ">
                        <Image className="ml-3 w-9" src={submiticon} alt=""></Image>
                        <div className="px-3 text-[#48C84D]    font-bold">
                            Submit
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}