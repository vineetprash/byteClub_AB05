import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-dist-min";
import { Divider } from "@nextui-org/react";

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

      Plotly.react("stock-graph", plotData, layout);
    }
  }, [dataframe]);

  return (
    <>
      {dataframe && (
        <div
          id="stock-graph"
          className="flex text-white p-4 m-4 rounded-lg relative bottom-24 bg-black opacity-50"
        ></div>
      )}
      {!dataframe && (
        <div className="flex text-white p-4 m-4 rounded-lg relative bottom-24 bg-black opacity-50">
          <p>Ask a query to generate results</p>
        </div>
      )}
    </>
  );
};

export default StockHistoryGraph;
