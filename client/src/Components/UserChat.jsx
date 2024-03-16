import {
  Textarea,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";

const FETCH_ENDPOINT = "";
const fetchResponse = (url, query, setDisplay) => {
  // Modify url according to endpoint
  response = fetch(url)
    .then((res) => res.json())
    .then() // Process json response into valid message
    .catch((e) => console.log("Error handled: ", e));

  setDisplay(response);
};

function UserChat() {
  const [displayedResponse, setDisplay] = useState("");
  const [userQuery, setUserQuery] = useState("");

  return (
    <div className="bg-black shadow-xl rounded-lg py-3 p-6 w-full h-full my-4">
      <div id="responseDisplay" className="m-4 h-5/6">
        {" "}
        {/* Adjusted height */}
        <div className="flex items-center justify-center h-full">
          <div className="bg-black shadow-xl rounded-lg py-3 p-6 w-full max-h-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full">
              <div className="text-lg font-semibold mb-4">LLM's Response</div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 h-full overflow-auto">
                <Textarea
                  readOnly
                  className="w-full h-full  outline-none"
                  value={displayedResponse}
                  onChange={(e) => setDisplayedResponse(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="userInput"
        className="flex  flex-row items-center justify-center m-4 h-1/6 " // Adjusted height
      >
        <Textarea
          disableAutosize
          variant="bordered"
          placeholder="Type your query"
          defaultValue="Which stock is trending today?"
          value={userQuery}
          onValueChange={setUserQuery}
          className="w-max-sm"
        />
        <Spacer x={4} />
        <Button
          onClick={() => console.log("Message Sent")} // fetchResponse
          className="aspect-square right-0 w-10 hover:shadow-lg shadow-slate-500 "
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}

export default UserChat;
