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
  const [responseHistory, setMyResponseHistory] = useState([]);

  useEffect(() => {
    setMyResponseHistory([...responseHistory, displayedResponse]);
  }, [displayedResponse]);
  console.log("responses : ", responseHistory);

  return (
    <div className=" a flex flex-col shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] rounded-lg  w-full h-full m-4 text-slate-400 ">
      <div className=" b text-lg font-semibold m-1 px-2">LLM's Response</div>
      <Divider className="divi bg-slate-500" />
      <div className=" c flex flex-col m-2 h-full overflow-hidden">
        <div className="d m-2 snap-y h-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-700  overflow-auto overflow-x-hidden bg-black  rounded-lg  text-pretty text-sm text-slate-400 p-4">
          {responseHistory &&
            responseHistory.map((element, index) => {
              return (
                <div key={index}>
                  <div className="text-start m-1 p-3 bg-teal-900 user-chat-bubble">
                    {element[0]}
                  </div>
                  <div className="text-end m-1 p-3 bg-slate-800 ai-chat-bubble">
                    {element[1]}
                  </div>
                  <Divider className="snap-center" />
                </div>
              );
            })}
        </div>
        <div
          id="userInput"
          className="e flex text-white flex-row items-center justify-center mx-4 h-1/6"
        >
          <Textarea
            disableAutosize
            radius="sm"
            variant="underlined"
            placeholder="Type your query..."
            className="w-full h-max right  text-white  caret-teal-700"
            onChange={(e) => setUserQuery(e.target.value)}
            endContent={
              <Button
                isDisabled={false}
                size="sm"
                isIconOnly
                startContent={
                  isReceived ? <SendIcon /> : <CircularProgress size="sm" />
                }
                onClick={() => {
                  responseHistory.push([userQuery, "random response"]); // temporary random data until api token is changed
                  console.log("Message Sent");
                  isReceived ? setIsReceived(false) : setIsReceived(true);
                  isReceived &&
                    fetchResponse(
                      userQuery,
                      setDisplay,
                      setIsReceived,
                      setArticles,
                      setDataframe,
                    );
                }}
                className="f bg-slate-300 hover:shadow-lg shadow-slate-300 "
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default UserChat;
