"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

export default function Calendar() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "1Event with Time (Start & End)", // Describes events with specific start and end times
      start: "2024-12-20T10:00:00",
      end: "2024-12-20T11:30:00",
      allDay: false,
      backgroundColor: "#1E90FF",
      textColor: "#FFFFFF",
      extendedProps: { location: "Conference Room A", organizer: "Alice" },
    },
    {
      id: "2",
      title: "2All-Day Event", // Focuses on the all-day attribute
      start: "2024-12-25",
      allDay: true,
      backgroundColor: "#FFD700",
      description:
        "This event lasts the entire day without specific start/end times.",
    },
    {
      id: "3",
      title: "3Multi-Day Event (Start & End Dates)", // Represents an event spanning multiple days
      start: "2024-12-28",
      end: "2024-12-30", // Exclusive, ends just before this date
      allDay: true,
      backgroundColor: "#32CD32",
      extendedProps: {
        location: "Lakeview Resort",
        activities: ["Workshops", "Networking"],
      },
    },
    {
      id: "4",
      title: "4Timed Event with Location", // Demonstrates a timed event with a location in extendedProps
      start: "2024-12-22T14:30:00",
      end: "2024-12-22T15:00:00",
      allDay: false,
      backgroundColor: "#FF4500",
      extendedProps: { location: "City Clinic", doctor: "Dr. Smith" },
    },
    {
      id: "5",
      title: "5Event with URL Link", // Example of an event with a clickable link
      start: "2024-12-31T20:00:00",
      end: "2025-01-01T01:00:00",
      allDay: false,
      backgroundColor: "#800080",
      textColor: "#FFFFFF",
      // url: "https://www.google.co.th",
    },
    {
      id: "6",
      title: "6Event with Custom Properties", // Showcases custom properties in extendedProps
      start: "2024-12-20T08:00:00",
      end: "2024-12-20T09:00:00",
      allDay: false,
      backgroundColor: "#FF6347",
      extendedProps: {
        priority: "High",
        notes: "Prepare presentation materials",
      },
    },
  ]);

  return (
    <>
      <div className="p-4 bg-[#0B111B] text-[#FAFAFA] rounded shadow">
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
          eventClick={(info) => alert(`${info.event.title}`)}
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
          
        />
      </div>
    </>
  );
}
