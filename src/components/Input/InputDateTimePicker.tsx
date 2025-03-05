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

interface InputDateTimePickerProps {
  value: string;
  onChange: (newValue: string, name: string) => void;
  name: string;
  bgColor?: string;
  textColor?: string;
}

const InputDateTimePicker: React.FC<InputDateTimePickerProps> = ({
  value,
  onChange,
  name,
  bgColor = "#2A3A50", // Default bgColor
  textColor = "#FAFAFA" // Default textColor
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

  const handleDateTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.toISOString(), name);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
      <DateTimePicker
        sx={{
          input: { backgroundColor: bgColor, color: textColor },
          bgcolor: bgColor,
          borderRadius: 2,
          p: "4px",
          "& .MuiSvgIcon-root": {
            color: "#93C5FD",
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
