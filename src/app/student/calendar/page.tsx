"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { GetAllAssignmentForCalendar } from "@/app/services/calendar.service";
import { ICalendar } from "@/app/interfaces/calendar.interface";
import { EventInput } from "@fullcalendar/core/index.js";

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    const fetchAssignmentsCalendar = async () => {
      const assignments: ICalendar[] = await GetAllAssignmentForCalendar();
        const formattedEvents:EventInput[] = assignments.map((assignment) => ({
          id: assignment.assignmentId,
          title: assignment.title,
          start: new Date(assignment.startAt).toISOString(),
          end: new Date(assignment.expireAt).toISOString(),
          backgroundColor: "#5572FA",
          textColor: "#FAFAFA",
          borderColor: "#5572FA",
          className: "text-sm font-bold text-center text-wrap 2xl:py-5",
        }));
        setEvents(formattedEvents);
    };

    fetchAssignmentsCalendar();
  }, []);

  return (
    <>
      <div className="p-4 bg-[#0B111B] text-[#FAFAFA] rounded shadow items-center">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          height={"95vh"}
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
          dayHeaderClassNames={() => "bg-gray-100 text-gray-700 font-semibold"}
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
    </>
  );
}
