import React ,{useEffect, useState ,useContext} from 'react';

import {contextThemeController} from '../../context/themeContext';

import styles from "./candleChart.module.css";
import dynamic from "next/dynamic";
import { getCryptosHistory } from '../../api/chartApi';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CandleChart = ({symbol}) => {

    const {Theme ,setTheme} = useContext(contextThemeController)

    const today = new Date()
    const oneMonthAgo = new Date(today.getFullYear() ,today.getMonth() - 1 ,today.getDate()).toISOString()

    const justStartDate = oneMonthAgo.split("T")[0]

    const endDate = new Date().toISOString()
    const justEndDate = endDate.split("T")[0]
    
    const [chartOptions ,setChartOptions] = useState({options: {
        dataLabels:{style: Theme ? {color:"#000"} : {color:"#fff"}},
        chart: {
            type: 'candlestick',
            height: 350,
            background: Theme ? "#E5F4EF" : "#2A2E39",
            foreColor: Theme ? "#000" : "#fff",
            borderRadius:".5rem",
            
        },

        responsive: [{
            breakpoint: 1200,
            options: {
                chart:{
                    width:"600",
                }
            },
        },
        {
            breakpoint: 600,
            options: {
                chart:{
                    width:"310",
                   
                }
            },
        }
    ],

        title: {
            text: 'CandleStick Chart',
            align: 'left',
            style:{color: Theme ? "#000" : "#fff"}
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    },})

    const [chartData ,setChartData] = useState({
        series: [{data: []}]
    })

useEffect(() => {
    const info ={
        startDate:`${justStartDate}`,
        endDate:`${justEndDate}`,
        code:symbol,
        period:"12hour"
    }
    getCryptosHistory(info ,(isOk ,data) => {
        const arr = []
        if(isOk){
            const history = data?.response?.history;
            if(history){

                for (let i = 1; i < history.length; i++) {
                    arr.push({
                        x: new Date(history[i].time),
                        y:[parseInt(history[i].open) ,parseInt(history[i].high) ,parseInt(history[i].low) ,parseInt(history[i].close)]
                    })    
                }

                setChartData({
                    series:[{
                        data:[
                            ...arr
                        ]
                    }]
                })
            }
        }else{
            return console.log(data);
        }
    })
} ,[symbol])

useEffect(() => {
   setChartOptions({options: {
    dataLabels:{style: Theme ? {color:"#000"} : {color:"#fff"}},
    chart: {
        type: 'candlestick',
        height: 350,
        background: Theme ? "#E5F4EF" : "#2A2E39",
        foreColor: Theme ? "#000" : "#fff",
        borderRadius:".5rem",
        
    },

    responsive: [
    {
        breakpoint: 1200,
        options: {
            chart:{
                width:"600",
               
            }
        },
    },
    {
        breakpoint: 600,
        options: {
            chart:{
                width:"310",
               
            }
        },
    }
    
],

    title: {
        text:`${symbol} نمودار `,
        align: 'left',
        style:{color: Theme ? "#000" : "#fff"}
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        tooltip: {
            enabled: true
        }
    }
},})
} ,[Theme ,symbol])

return(
        <div className={styles.candleChartContainer} id="chart">
            {
                chartData.series[0].data.length > 0 &&
            <Chart options={chartOptions.options} series={chartData.series} type="candlestick" height={350} width={1200} />
            }
        </div>
        )
      
    }

  

export default CandleChart;
