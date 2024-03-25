import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-dist-min";
import { Divider } from "@nextui-org/react";

const StockHistoryGraph = ({ dataframe }) => {
  const [hasData, setHasData] = useState(false);
  useEffect(() => {
    if (dataframe !== null && dataframe.data) {
      setHasData(true);
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
    <>
      {!setHasData ? (
        <div
          id="stock-graph"
          className="flex text-white p-4 m-4 rounded-lg relative bottom-24 bg-black opacity-50"
        ></div>
      ) : (
        <div className="flex text-white p-4 m-4 rounded-lg relative bottom-24 bg-black opacity-50">
          <p>Ask a query to generate results</p>
        </div>
      )}
    </>
  );
};

export default StockHistoryGraph;
