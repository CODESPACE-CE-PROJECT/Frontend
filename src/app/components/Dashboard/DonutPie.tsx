import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

interface Props {
     className?: string
}

export const DonutPie:React.FC<Props> = ({className}) => {
     const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
     const options: ApexOptions = {
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
               series={[10,20]}
               options={options}
               type='donut'
          />
     </div> 
}