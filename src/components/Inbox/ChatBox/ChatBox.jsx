import React from "react";
import { Box } from "@material-ui/core";
import { MessageLeft, MessageRight } from "../../../views/Chat/Message";
import { useSelector } from "react-redux";
import RenderButton from "./RenderButton";

export default function ChatBox() {
  const { messages } = useSelector(state => state.messageSlice)
  const { flag, info } = useSelector(state => state.friend)

  return (
    <Box>
      <RenderButton flag={flag} info={info} />
      <div style={{ marginTop: '12px' }}>
        <MessageLeft
          message="Hii Pradeep"
          timestamp="09:34 pm"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName=""
          avatarDisp={true}
        />
        <MessageLeft
          message="Kya haal chal rha he"
          timestamp="09:34 pm"
          photoURL=""
          displayName=""
          avatarDisp={false}
        />
        {
          messages && messages?.length > 0 && messages?.map(msg =>
            <MessageRight
              message={msg.message}
              timestamp={msg.time}
            // photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            // displayName="まさりぶ"
            // avatarDisp={true}
            />
          )
        }
      </div>
    </Box>
  );
}
