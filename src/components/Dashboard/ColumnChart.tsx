import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

interface Props {
     school: number[],
     student: number[],
     teacher: number[],
     month: string[]
}

export const ColumnChart:React.FC<Props> = ({school, student, teacher, month}) => {
     const Chart = dynamic(() => import('react-apexcharts'), {ssr: false})
     const options: ApexOptions = {
          series: [{
               name: 'ผู้เรียน',
               data: student
          }, {
               name: 'ผู้สอน',
               data: teacher
          }, {
               name: 'โรงเรียน',
               data: school
          }],
          chart: {
               type: 'bar',
               height: 350,
               foreColor: "#fafafa",
               fontFamily: 'Noto Sans Thai, Noto Sans Thai Fallback',
               toolbar: {
                    show: false
               },
          },
          plotOptions: {
               bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 5,
                    borderRadiusApplication: 'end',
               }
          },
          dataLabels: {
               enabled: false,
          },
          stroke: {
               show: true,
               width: 2,
               colors: ['transparent']
          },
          xaxis: {
               categories: month,
          },
          yaxis: {
               title: {
                    text: 'จำนวน',
                    style: {
                         fontSize: "16px"
                    }
               }
          },
          fill: {
               opacity: 1
          },
          tooltip: {
               theme: 'custom',
               y: {
                    formatter(val, opts) {
                         return val.toString()
                    },
               },
               style: {
                    fontSize: '14px',
               },
          },
          noData: {
               text: 'กำลังโหลดข้อมูล...'
          },
          legend: {
               fontSize: '16px'
          },
          colors: ['#344BFD', '#FF9359', '#9747FF']
     }


     return <Chart
          options={options}
          series={options.series}
          type='bar'
          height={243}
     />
}