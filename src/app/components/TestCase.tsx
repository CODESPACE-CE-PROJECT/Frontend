import TestcaseIcon from "../../../src/app/assets/HomeworkAssets/testcase.svg"
import Image from 'next/image'
import { useState } from 'react';

export default function TestCase() {
    const [currentCase, setCurrentCase] = useState<null>(null);

    return (
        <>
            <div>
                <div className="bg-[#161e2e]  rounded-t-lg text-[#a2a5ab] pt-1 pl-2 flex flex-row pb-1 ">
                    <Image src={TestcaseIcon} alt="" className="w-4" />
                    <div className="pl-2">Testcase</div>
                </div>
                <div className=" bg-[#1c2333] text-xl text-[#C2C8CC]  rounded-b-lg h-72-">
                    <div className="text-white  pl-3 pr-4 ">
                        <div className="flex flex-row space-x-14 pt-3">
                            <button className="focus:bg-[#2b3445] hover:bg-[#2b3445] hover:text-[#ACAEB1] rounded-md h-9 w-20" onClick={() => setCurrentCase(
                                <div className="pt-3  pb-3">
                                    <div className="pb-4">
                                        Input =
                                    </div>
                                    <div className="bg-[#2b3445] rounded-md pl-4 pt-3 pb-3 	">
                                        [5, 5]
                                    </div>
                                    <div className="pb-3 pt-3">
                                        Output =
                                    </div>
                                    <div className="bg-[#2b3445] rounded-md pl-4 pt-3 pb-3 	">
                                        25
                                    </div>

                                </div>)}>Case 1</button>
                            <button className="focus:bg-[#a2a5ab] hover:bg-[#2b3445] hover:text-[#ACAEB1] rounded-md h-9 w-20" onClick={() => setCurrentCase(<div className="pt-3  pb-3">
                                <div className="pb-4">
                                    Input =
                                </div>
                                <div className="bg-[#2b3445] rounded-md pl-4 pt-3 pb-3 	">
                                    [12, 5]
                                </div>
                                <div className="pb-3 pt-3">
                                    Output =
                                </div>
                                <div className="bg-[#2b3445] rounded-md pl-4 pt-3 pb-3 	">
                                    60
                                </div>

                            </div>)}>Case 2</button>
                            <button className="focus:bg-[#2b3445] hover:bg-[#2b3445] hover:text-[#ACAEB1] rounded-md h-9 w-20" onClick={() => setCurrentCase(<div className="pt-3  pb-3">
                                <div className="pb-4">
                                    Input =
                                </div>
                                <div className="bg-[#2b3445] rounded-md pl-4 pt-3 pb-3 	">
                                    [50, 3]
                                </div>
                                <div className="pb-3 pt-3">
                                    Output =
                                </div>
                                <div className="bg-[#2b3445] rounded-md pl-4 pt-3 pb-3 	">
                                    150
                                </div>

                            </div>)}>Case 3</button>
                        </div>
                        <div className="pt-4 pl-2">
                            {currentCase}
                        </div>
                    </div>
                </div>
            </div>

        </>




    )


}
