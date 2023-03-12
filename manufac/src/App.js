import { useState } from 'react';
import './App.css';
import ScatterPlot from './charts/ScatterPlot';
import BarChart from './charts/BarChart';
import data from './data/wineData.json'

function App() {
  const [plot,setPlot]=useState(true)
  return (
    <div className='app'>
        {plot?<div className='scatterplot'><ScatterPlot data={data}/></div>:<div className='barchart'><BarChart data={data}/></div>}
      <div className='btn'>
        <button onClick={()=>setPlot(!plot)}>{plot?"Switch to Bar Chart":"Switch to Scatter Plot"}</button>
      </div>
    </div>
  );
}

export default App;
