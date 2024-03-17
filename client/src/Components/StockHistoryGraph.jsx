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
        marker: { color: 'blue' },
      }];

      const layout = {
        title: 'Stock History',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Price' },
      };

      Plotly.newPlot('stock-graph', plotData, layout);
    }
  }, [data]);

  return (
    <div id="stock-graph" className='rounded-lg relative bottom-24'></div>
  );
};

export default StockHistoryGraph;
