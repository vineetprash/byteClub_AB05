import UserChat from "./Components/UserChat";
import StockHistogram from "./Components/StockHistogram";
import ProfilePage from "./Components/ProfilePage";
import NavBar from "./Components/NavBar";
import Articles from "./Components/Articles";
import StockHistoryGraph from "./Components/StockHistoryGraph";
import { client } from "@gradio/client";
import React from "react";
import { useState } from "react";

import image from "./assets/bg2.jpg";

async function fetchResponse(
  userQuery,
  setDisplay,
  setIsReceived,
  setArticles,
) {
  try {
    console.log("You entered", userQuery);
    const app = await client("http://127.0.0.1:7860/");
    const result = await app.predict("/predict", [
      [`${userQuery}`], // string  in 'prompt' Textbox component
    ]);
    console.log(`Result: `, result.data);
    console.log(`Result: `, result.data[1]);
    setDisplay(result.data[0]);
    setIsReceived(true);
    setArticles(result.data[2]);
  } catch (error) {
    console.log("Error handled: ", error);
  }
}

function App() {
  const [displayedResponse, setDisplay] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [articles, setArticles] = useState([]);

  const stockHistoryData = {
    x: ["2024-03-01", "2024-03-02", "2024-03-03"],
    y: [100, 110, 105],
  };
  return (
    <div className="">
      <NavBar />
      <div
        className="flex flex-row w-full justify-center items-center h-screen bg-zinc-900 overflow-hidden fixed"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div id="supportingData" className="flex flex-col h-full w-1/2">
          <div id="1" className={`flex h-1/2 m-4 justify-center items-center`}>
            <Articles articles={articles} setArticles={setArticles} />
          </div>

          <div id="2" className={`flex h-1/2 m-4 justify-center items-center`}>
            {/* <StockHistogram /> */}
            <StockHistoryGraph data={stockHistoryData} />
          </div>
        </div>

        <div
          id="3"
          className={`flex w-1/2 h-full m-4 justify-center items-center backdrop-blur-sm`}
        >
          <UserChat
            displayedResponse={displayedResponse}
            setDisplay={setDisplay}
            userQuery={userQuery}
            setUserQuery={setUserQuery}
            fetchResponse={fetchResponse}
            setArticles={setArticles}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
