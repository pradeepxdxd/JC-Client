import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { MessageLeft, MessageRight } from "../../../views/Chat/Message";
import { useSelector } from "react-redux";
import RenderButton from "./RenderButton";
import io from "socket.io-client";
import { APP_URL } from "../../../configs/dev";

const socket = io(APP_URL);

export default function ChatBox({ chats, setChats }) {
  const { messages } = useSelector(state => state.messageSlice)
  const { flag, info } = useSelector(state => state.friend)

  useEffect(() => {
    // Register the userId with the server when the user connects
    console.log({ infopradeep: info?.friendId })
    socket.emit('register', info?.friendId);

    // Listen for private messages
    socket.on('private message', (msg) => {
      setChats((prevChats) => {
        if (!Array.isArray(prevChats)) {
          // Ensure prevChats is an array
          return [{ flag: 'LEFT', message: msg?.message, time: msg?.timestamp }];
        }
        return [...prevChats, { flag: 'LEFT', message: msg?.message, time: msg?.timestamp }];
      });
    });

    return () => {
      socket.off('private message');
    };
  }, [info?.friendId, setChats]);

  console.log({ chats, type: typeof chats })

  return (
    <Box>
      <RenderButton flag={flag} info={info} />
      <div style={{ marginTop: '12px' }}>
        {chats && chats.length > 0 && chats.map((chat, index) => (
          chat.flag === 'LEFT' ? (
            <MessageLeft
              key={index}
              message={chat.message}
              timestamp={chat.time}
              displayName=""
              avatarDisp={true}
            />
          ) : (
            <MessageRight
              key={index}
              message={chat.message}
              timestamp={chat.time}
              avatarDisp={true}
            />
          )
        ))}
      </div>
    </Box>
  );

}

// {/* <MessageLeft
//   message="Hii Pradeep"
//   timestamp="09:34 pm"
//   photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
//   displayName=""
//   avatarDisp={true}
// />
// <MessageLeft
//   message="Kya haal chal rha he"
//   timestamp="09:34 pm"
//   photoURL=""
//   displayName=""
//   avatarDisp={false}
// />
// <MessageRight
//   message={''}
//   timestamp={''}
//   photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
//   displayName="まさりぶ"
//   avatarDisp={true}
// /> */}