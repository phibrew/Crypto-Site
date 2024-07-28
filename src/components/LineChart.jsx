import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {
const [data, setData] = useState([["Data", "Prices"]]);
useEffect(()=>{
    let copy = [["Data", "Prices"]];
    if(historicalData.prices){
        historicalData.prices.map(items=>{
        copy.push([`${new Date(items[0]).toLocaleDateString().slice(0,-5)}`, items[1]])
        setData(copy);
    })
    }
}, [historicalData])
  return (
    <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
    />
  )
}

export default LineChart
