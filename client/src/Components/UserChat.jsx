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
    <div className="bg-slate-800 p-4 rounded-lg w-auto text-gray-200">
      <div id="responseDisplay" className="w-1/2 m-4">
        <Card>
          <CardHeader>
            <p>LLM's Response</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <Textarea isReadOnly value={displayedResponse} />
          </CardBody>
        </Card>
      </div>

      <div
        id="userInput"
        className="flex w-1/2 flex-row items-center justify-center m-4 "
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
