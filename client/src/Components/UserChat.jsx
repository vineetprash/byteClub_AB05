import {
  Textarea,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Spacer,
  CircularProgress,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";

function UserChat({
  displayedResponse,
  setDisplay,
  userQuery,
  setUserQuery,
  fetchResponse,
  setArticles,
}) {
  const [isReceived, setIsReceived] = useState(true);
  return (
    <div className="bg-black shadow-xl  py-3 p-6 w-full h-full my-4 text-white">
      <div id="responseDisplay" className="m-4 h-5/6">
        <div className="flex items-center justify-center h-full">
          <div className="bg-black shadow-xl rounded-lg py-3 p-6 w-full max-h-full">
            <div className="bg-gray-800 rounded-lg shadow-md p-4 h-full">
              <div className="text-lg font-semibold mb-4">LLM's Response</div>
              <div className=" dark:border-gray-600 pt-4 h-full overflow-auto">
                <Textarea
                  readOnly
                  className="w-full h-full  outline-none"
                  value={displayedResponse}
                  onChange={(e) => {
                    setDisplay(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="userInput"
        className="flex text-white flex-row items-center justify-center m-4 h-1/6 relative bottom-28" // Adjusted height
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
          onClick={() => {
            console.log("Message Sent");
            setIsReceived(false);
            fetchResponse(userQuery, setDisplay, setIsReceived, setArticles);
          }} // fetchResponse
          className="aspect-square right-0 w-10 hover:shadow-lg shadow-slate-500 "
        >
          {isReceived ? <SendIcon /> : <CircularProgress />}
        </Button>
      </div>
    </div>
  );
}

export default UserChat;
