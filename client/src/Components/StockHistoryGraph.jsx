import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-dist-min";

const StockHistoryGraph = ({ dataframe }) => {
  useEffect(() => {
    if (dataframe !== null && dataframe.data) {
      // Extract x and y values from dataframe data
      const dx = dataframe.data.map((item) => item[0]);
      const dy = dataframe.data.map((item) => item[18]);

      const plotData = [
        {
          x: dx,
          y: dy,
          type: "scatter",
          mode: "lines",
          marker: { color: "white" },
        },
      ];

      const layout = {
        title: "Stock History",
        xaxis: { title: "Date" },
        yaxis: { title: "Price" },
        plot_bgcolor: "black",
        paper_bgcolor: "black",
        font: { color: "white" },
      };

      Plotly.newPlot("stock-graph", plotData, layout);
    }
  }, [dataframe]);

  return (
    <div
      id="stock-graph"
      className="rounded-lg relative bottom-24 opacity-50"
    ></div>
  );
};

export default StockHistoryGraph;
