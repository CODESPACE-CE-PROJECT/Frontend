import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { IDashboardProvince } from '@/types/dashboard'

interface Props {
     className?: string,
     province: IDashboardProvince[] | undefined
}

export const DonutPie:React.FC<Props> = ({className, province}) => {
     const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
     const options: ApexOptions = {
          series: province?.flatMap((item) => item.school) || [],
          chart: {
               type: 'donut',
               foreColor: '#fafafa',
               width: '100%',
               height: '100%'
          },
          stroke: {
               show: true,
               width: 2,
               colors: ['transparent']
          },
          labels: province?.flatMap((item) => item.provinceName) || [],
          plotOptions: {
               bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 5,
                    borderRadiusApplication: 'end',
               }
          },
          responsive: [{
               breakpoint: 480,
               options: {
                    chart: {
                         width: 200
                    },
                    legend: {
                         position: 'bottom'
                    }
               }
          },
          ],
          legend: {
               show: false
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
               fillSeriesColor: false
          },
     }

     return <div className={className}>
          <Chart
               series={options.series}
               options={options}
               type='donut'
          />
     </div> 
}