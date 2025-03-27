"use client";

import {
  DateTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/th";
import React, { useMemo } from "react";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

interface InputDateTimePickerProps {
  value: string;
  onChange: (newValue: string, name: string) => void;
  name: string;
  bgColor?: string;
  textColor?: string;
  border?: string;
}

const InputDateTimePicker: React.FC<InputDateTimePickerProps> = ({
  value,
  onChange,
  name,
  border,
  bgColor = "#2A3A50",
  textColor = "#FAFAFA"
}) => {
  const thaiLocaleText = {
    cancelButtonLabel: "ยกเลิก",
    okButtonLabel: "ตกลง",
    toolbarTitle: "เลือกวันที่และเวลา",
    datePickerToolbarTitle: "เลือกวันที่",
    timePickerToolbarTitle: "เลือกเวลา",
    hours: "ชั่วโมง",
    minutes: "นาที",
    seconds: "วินาที",
    ampmLabel: "AM/PM",
  };

  const dayjsValue = useMemo(() => dayjs(value), [value]);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("th"); 
    
  const handleDateTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.toISOString(), name);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
      <DateTimePicker
        sx={{
          input: { backgroundColor: bgColor, color: textColor, borderRadius: 2, borderColor: "transparent" },
          bgcolor: bgColor,
          borderRadius: 2,
          border: border,
          p: "0px",
          "& .MuiSvgIcon-root": {
            color: "#93C5FD",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none", 
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        slotProps={{
          textField: {
            size: "small",
            error: false,
          },
        }}
        value={dayjsValue}
        localeText={thaiLocaleText}
        timezone="Asia/Bangkok"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        onChange={handleDateTimeChange}
      />
    </LocalizationProvider>
  );
};

export default InputDateTimePicker;
