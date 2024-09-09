import description from "../../../src/app/assets/HomeworkAssets/Descriptionicon.svg";
import Image from 'next/image';

export default function Description() {
    return (
        <div>
            <div className="bg-[#161e2e] rounded-t-lg text-[#a2a5ab] flex items-center pt-1 pb-1 pl-2">
                <Image src={description} alt="Description Icon" className="w-4" />
                <div className="pl-2">Description</div>
            </div>
            <div className="p-2 pt-0 bg-[#1c2333] text-xl text-[#C2C8CC] rounded-b-lg h-screen">
                <div className="text-white pt-5 pl-4 pr-4">
                    <h2 className="text-3xl font-bold mb-4 text-[#00D1FF]">Two Sum Problem</h2>
                    <p className="leading-7">
                        Given an array of integers <code className="bg-[#2b3445] px-1 rounded">nums</code> and an integer <code className="bg-[#2b3445] px-1 rounded">target</code>,
                        return <strong>indices</strong> of the two numbers such that they add up to <code className="bg-[#2b3445] px-1 rounded">target</code>.
                    </p>
                    <p className="mt-4 leading-7">
                        You may assume that each input would have <strong>exactly one solution</strong>,
                        and you may not use the same element twice.
                    </p>
                    <p className="mt-4 leading-7">
                        You can return the answer in any order.
                    </p>

                    <h3 className="mt-6 text-lg font-semibold text-[#00D1FF]">Example:</h3>
                    <pre className="bg-gray-800 p-4 rounded-md mt-2 overflow-x-auto">
                        <code className="block whitespace-pre-wrap text-[#C2C8CC]">
{`Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`}
                        </code>
                    </pre>

                    <h3 className="mt-6 text-lg font-semibold text-[#00D1FF]">Constraints:</h3>
                    <pre className="bg-gray-800 p-4 rounded-md mt-2 overflow-x-auto">
                        <code className="block whitespace-pre-wrap text-[#C2C8CC]">
{`2 ≤ nums.length ≤ 10^4
-10^9 ≤ nums[i] ≤ 10^9
-10^9 ≤ target ≤ 10^9
Only one valid answer exists.`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
