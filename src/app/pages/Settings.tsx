"use client";
import ProfileSettings from '../components/ProfileSettings';
import AccountSettings from '../components/AccountSettings';
import Link from 'next/link';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';

export default function HomeWorkSpace() {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen">
                <div className="rounded-lg p-6 w-full h-2/4 md:w-1/3 flex flex-col mt-16">
                    <div className="flex items-center mb-4">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/5e9c/105e/930aea22bd61806331b237ae5a782e5b?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=helOIN69pRTbSNNQptLPOiom6g~HkbbGNVRQ8IFAWSulyLvzwiqyiNLEEllf3qZ8VvS60fuv9jkYKGq5HKSTX9HrF3VmszU2nOgUsDoF-isMsL1ORvo~rO-CapaUlTAhugGUur--Nc5jbCst9iUprdJ8hXtrzWhOXzDDe4thGXn5GGZU5W4h7w53Vx4RCCYyQgnnfO3FqKGJYU~J~4VIMqlyGcSLRAM1FxVB9iSevtmMdzGPungk1~FT6zW5WcxjFBS5LfnLawTB4G-h9jAdMS29siCH2x4WaM3oRmyS1wrFMynYWtlB7SdyGDiuDcW24eNOe5~qxTQuVRWvns~W7A__"
                            className="w-24 h-24 rounded-full border border-gray-300 mr-4"
                        />
                        <div>
                            <h1 className="text-2xl font-bold mb-2 text-white 			">Nasang</h1>
                        </div>
                    </div>
                    <Link href="#Profile" className="text-white px-4 py-2 rounded my-3 hover:bg-[#242935] focus:bg-[#242935]">
                        <PersonOutlineIcon className="mr-2" />
                        โปรไฟล์
                    </Link>
                    <Link href="#Account" className="text-white px-4 py-2 rounded hover:bg-[#242935] focus:bg-[#242935]">
                        <SettingsIcon className="mr-2" />
                        บัญชี
                    </Link>
                </div>
                <div id="Profile" className="flex flex-col w-full md:w-2/3 space-y-4">
                    <div className="rounded-lg p-6">
                        <ProfileSettings />
                    </div>
                    <div id="Account" className="rounded-lg p-6">
                        <AccountSettings />
                    </div>
                </div>
            </div>
        </>
    );
}
