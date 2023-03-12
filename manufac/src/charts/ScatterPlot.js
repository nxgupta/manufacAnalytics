import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ScatterPlot = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Creating a chart instance
    const myChart = echarts.init(chartRef.current);

    // Setting chart options
    const option = {
      title: {
        text: 'Scatter Plot',
      },
      tooltip: {},
      xAxis: {
        type: 'value',
        name: 'Color Intensity',
      },
      yAxis: {
        type: 'value',
        name: 'Hue',
      },
      series: [
        {
          symbolSize: 10,
          data: data.map(({ "Color intensity": x, "Hue": y }) => [x, y]),
          type: 'scatter',
        },
      ],
    };

    
    // Rendering the chart
    myChart.setOption(option);

    // Cleanup function to destroy the chart instance
    return () => {
      myChart.dispose();
    };
    
  }, [data]);

  return <div ref={chartRef} style={{width:'100%', height:'500px'}}/>;
};

export default ScatterPlot;
