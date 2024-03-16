import React from "react";
import { Textarea, Button } from "@nextui-org/react";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

function UserChatInputBox() {
  const [userQuery, setUserQuery] = useState("");
  return (
    <div className="flex w-1/3 flex-row justify-center items-center m-4">
      <Textarea
        disableAutosize
        variant="bordered"
        placeholder="Type your query"
        // defaultValue="Which stock is trending today?"
        value={userQuery}
        onValueChange={setUserQuery}
        className="max-w-xs"
      />
      <Button
        onClick={console.log("Message Sent")}
        className="mx-4 aspect-square w-10 hover:shadow-lg shadow-slate-500 "
      >
        <SendIcon />
      </Button>
    </div>
  );
}

export default UserChatInputBox;
