import React from "react";
import { Box } from "@material-ui/core";
import { MessageLeft, MessageRight } from "../../../views/Chat/Message";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

export default function ChatBox() {
  const { messages } = useSelector(state => state.messageSlice)

  return (
    <Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px', // Adds space between buttons
          marginTop: '12px' // Adds some space above the buttons
        }}
      >
        <Button variant="contained" sx={{ backgroundColor : '#2c343d'}}>Add To Contact</Button>
        <Button variant="contained" sx={{ backgroundColor : '#2c343d'}}>Block</Button>
      </Box>
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
