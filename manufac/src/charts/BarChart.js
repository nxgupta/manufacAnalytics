import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ data }) => {
    const chartRef = useRef(null);

    //getting alcohol classes
    const groupedData = data.reduce((acc, obj) => {
        const alcohol = obj["Alcohol"];
        if (!acc[alcohol]) {
          acc[alcohol] = [];
        }
        acc[alcohol].push(obj);
        return acc;
      }, {});

      //getting average of Malic acid per alocohal class (fixed to 2 digits after decimal)
      const averages = {};
      for (const alcohol in groupedData) {
        const group = groupedData[alcohol];
        const total = group.reduce((acc, obj) => acc + obj["Malic Acid"], 0);
        const average = total / group.length;
        averages[alcohol] = average.toFixed(2);
      }

  useEffect(() => {
    // Extracting the required data for the chart
    const alcoholData = []
    const malicAcidData = []

    for(let i in averages){
        alcoholData.push(i)
        malicAcidData.push(averages[i])
    }

    // Creating a chart instance
    const chart = echarts.init(chartRef.current);

    // Setting chart options
    const options = {
      title: {
        text: 'Average Malic Acid for each Alcohol Class'
      },
      tooltip: {},
      xAxis: {
        data: alcoholData,
        name: 'Alcohol'
      },
      yAxis: {
        name: 'Average Malic Acid'
      },
      series: [{
        symbolSize: 10,
        name: 'Average Malic Acid',
        type: 'bar',
        data: malicAcidData,
      }]
    };

    // Rendering the chart
    chart.setOption(options);

    // Cleanup function to destroy the chart instance
    return () => {
      chart.dispose();
    }
  });

  return <div ref={chartRef} style={{width:'100%', height:'500px'}}/>;

};

export default BarChart;
