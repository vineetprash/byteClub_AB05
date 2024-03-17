import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';

const StockHistoryGraph = ({ data }) => {
    
  useEffect(() => {
    if (data) {
      const plotData = [{
        x: data.x,
        y: data.y,
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'white' },
      }];

      const layout = {
        title: 'Stock History',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Price' },
        plot_bgcolor: 'black',
        paper_bgcolor: 'black',
        font: { color: 'white' } 
      };

      Plotly.newPlot('stock-graph', plotData, layout);
    }
  }, [data]);

  return (
    <div id="stock-graph" className='rounded-lg relative bottom-24'></div>
  );
};

export default StockHistoryGraph;
