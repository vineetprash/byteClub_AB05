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
  setDataframe,
}) {
  const [isReceived, setIsReceived] = useState(true);
  const [items, setMyItems] = useState([]);

  useEffect(() => {
    setMyItems([...items, displayedResponse]);
    // localStorage.setItem("items", JSON.stringify(items));
  }, [displayedResponse]);
  return (
    <div className=" a flex flex-col bg-zinc-600 bg-[#082032] rounded-lg  w-full h-full m-4 text-white ">
      <div className=" b text-lg font-semibold m-4">LLM's Response</div>
      <Divider />
      <div className=" c flex flex-col m-4 h-full overflow-hidden">
        <div className="d m-4 h-5/6    bg-zinc-900 bg-[#0b161f] rounded-lg text-white">
          {items &&
            items.map((response) => {
              <>
                <p>{response}</p>
                <Divider />
              </>;
            })}
        </div>
        <div
          id="userInput"
          className="e flex text-white flex-row items-center justify-center mx-4 h-1/6"
        >
          <Textarea
            disableAutosize
            radius="sm"
            variant="bordered"
            placeholder="Type your query..."
            className="w-full h-max right"
          />
          <Spacer x={4} />
          <Button
            onClick={() => {
              console.log("Message Sent");
              setIsReceived(false);
              fetchResponse(
                userQuery,
                setDisplay,
                setIsReceived,
                setArticles,
                setDataframe,
              );
            }}
            className="f  hover:shadow-lg shadow-slate-500 "
          >
            {isReceived ? <SendIcon /> : <CircularProgress />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserChat;
