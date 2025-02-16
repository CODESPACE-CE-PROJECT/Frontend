import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { IScoreRange } from "@/types/assignment";

interface ScoreChartProps {
  data: IScoreRange[];
}

const ScoreChart: React.FC<ScoreChartProps> = ({ data }) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const categories = data.map((item) => item.range);
  const seriesData = data.map((item) => item.count);

  const options: ApexOptions = {
    series: [{ name: "ผู้เรียน", data: seriesData }],
    chart: {
      type: "bar",
      height: 350,
      foreColor: "#fafafa",
      fontFamily: "Noto Sans Thai, Noto Sans Thai Fallback",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories, //"0-5", "6-10"
      title: {
        text: "คะแนน",
        offsetX: 260,
        offsetY: -30,
        style: {
          fontWeight: 400,
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      title: {
        text: "คน",
        rotate: 1,
        offsetX: 0,
        offsetY: -110,
        style: {
          fontWeight: 400,
          fontSize: "14px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    tooltip: {
      theme: "custom",
      x: {
        formatter(val) {
          return `ช่วง ${val.toString()} คะแนน`;
        },
      },
      y: {
        formatter(val) {
          return `${val.toString()} คน`;
        },
      },
      style: {
        fontSize: "14px",
      },
    },
    legend: {
      fontSize: "16px",
      labels: { colors: "#5572FA" },
    },
    colors: ["#5572FA"],
    noData: {
      text: "กำลังโหลดข้อมูล...",
    },
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type="bar"
      height={300}
      width={600}
    />
  );
};

export default ScoreChart;
