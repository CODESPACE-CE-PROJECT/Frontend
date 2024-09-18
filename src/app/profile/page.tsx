"use client";

import SideNav from "../components/SideNav";
import UserNav from "../components/UserNav";
import Settings from "../pages/Settings";

export default function Profile() {
  return (
    <>
      <div className="flex flex-row">
        <SideNav />
        <div className="flex flex-col w-screen overflow-x-hidden overscroll-none">
          <UserNav />
          <Settings />
        </div>
      </div>
    </>
  );
}
