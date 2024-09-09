import Image from 'next/image'
import Arrow from "../../../src/app/assets/HomeworkAssets/arrow.svg"
import Iconc from "../../../src/app/assets/HomeworkAssets/logos_C+.svg"
import Iconpyton from "../../../src/app/assets/HomeworkAssets/logos_python.svg"
import Icon่java from "../../../src/app/assets/HomeworkAssets/logos_java.svg"
import Group from "../../../src/app/assets/HomeworkAssets/Group.svg"
import React, { useState } from 'react';
import Link from 'next/link';


export default function ProbNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div>
                <button
                    className="flex  left-0 top-0 z-50 "
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Image src={Group} alt="" />
                </button>


                <div
                    className={`fixed left-0 top-0 z-40 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div className="absolute left-0 top-0 w-4/12		 bg-[#1C2333] h-full shadow-lg ">
                        <button
                            className="flex left-0 top-0 z-50 p-4 bg-[#1C2333] border-b 	w-full	 text-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Problem List
                            <Image src={Arrow} alt="" className="ml-2 mt-1" />

                        </button>
                        <div className="  flex flex-col space-y-3 mt-6 ">
                            <button className="focus:bg-[#54607B] hover:bg-[#2b3445] hover:text-[#ACAEB1] bg-[#2b3445]  text-white 	rounded-md ml-4 mr-4 h-9" >
                                <div className="flex justify-between">
                                    <div className="ml-3">
                                        <Link href="/homeworkspace">1.Two Sum Problem</Link>
                                    </div>
                                    <div className="mr-3">
                                        <Image src={Iconc} alt="" className="ml-2 mt-1" />
                                    </div>
                                </div>
                            </button>
                            <button className="focus:bg-[#54607B] hover:bg-[#2b3445] hover:text-[#ACAEB1] bg-[#2b3445]  text-white 	rounded-md ml-4 mr-4 h-9">
                                <div className="flex justify-between">
                                    <div className="ml-3">
                                        2.xxxxxxxx
                                    </div>
                                    <div className="mr-3">
                                        <Image src={Icon่java} alt="" className="ml-2 mt-1" />
                                    </div>
                                </div>
                            </button>
                            <button className="focus:bg-[#54607B] hover:bg-[#2b3445] hover:text-[#ACAEB1] bg-[#2b3445]  text-white 	rounded-md ml-4 mr-4 h-9">
                                <div className="flex justify-between">
                                    <div className="ml-3">
                                        3.xxxxxxxx
                                    </div>
                                    <div className="mr-4">
                                        <Image src={Iconpyton} alt="" className="ml-2 mt-1" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>




    )


}
