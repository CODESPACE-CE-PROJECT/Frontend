"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { GetAllAssignmentFromCalendar } from "@/actions/calendar";
import { ICalendar } from "@/types/calendar";
import { EventInput } from "@fullcalendar/core/index.js";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { Loading } from "@/components/Loading/Loading";
import { TopNav } from "@/components/Navbar/TopNav";

export default function Page() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignmentsCalendar = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      const assignments: ICalendar[] = await GetAllAssignmentFromCalendar();
      const formattedEvents: EventInput[] = assignments.map((assignment) => ({
        id: assignment.assignmentId,
        title: assignment.title,
        start: new Date(assignment.startAt).toISOString(),
        end: new Date(assignment.expireAt).toISOString(),
        backgroundColor: "#5572FA",
        textColor: "#FAFAFA",
        borderColor: "#5572FA",
        className: "text-sm font-bold text-wrap",
      }));
      setEvents(formattedEvents);
      setLoading(false);
    };

    fetchAssignmentsCalendar();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
          <Loading className="size-20" />
        </div>
      ) : (
        <div className="w-screen h-screen p-10 px-16 pt-10 pb-16 bg-[#0B111B] text-[#FAFAFA] rounded shadow items-center">
          <TopNav
            className="mb-6"
            disableNotification={false}
            imageUrl={profile?.pictureUrl}
            role={profile?.role}
          >
            <p className="p-2">ปฏิทิน</p>
          </TopNav>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            height={"85vh"}
            events={events}
            locale={"th"}
            timeZone="Asia/Bangkok"
            editable={false}
            selectable={false}
            buttonText={{
              today: "วันนี้",
              month: "เดือน",
              week: "สัปดาห์",
              day: "วัน",
              list: "กำหนดการ",
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            dayHeaderClassNames={() =>
              "bg-gray-100 text-gray-700 font-semibold"
            }
            dayCellClassNames={() => "border border-gray-200 hover:bg-gray-50"}
            eventContent={(arg) => {
              const isCalendarType =
                arg.view.type === "dayGridMonth" || "timeGridWeek";
              return {
                html: isCalendarType
                  ? `<div class="fc-event-title">${arg.event.title}</div>` // Hide event time
                  : `<div class="fc-event-time">${arg.timeText}</div><div class="fc-event-title">${arg.event.title}</div>`, // Show event time
              };
            }}
            views={{
              timeGridWeek: { allDaySlot: false },
              timeGridDay: { allDaySlot: false },
            }}
          />
        </div>
      )}
    </>
  );
}
