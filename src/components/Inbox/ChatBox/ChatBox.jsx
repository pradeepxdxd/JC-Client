import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { MessageLeft, MessageRight } from "../../../views/Chat/Message";
import { useDispatch, useSelector } from "react-redux";
import RenderButton from "./RenderButton";
import { socket } from "../../../configs/socket/socket";
import { setChat } from "../../../store/chat/chat.slice";
import { getUserId } from "../../../utils/auth";

// const socket = io(APP_URL);

export default function ChatBox() {
  const uid = getUserId()
  const { chats } = useSelector(state => state.chat)
  const { flag, info } = useSelector(state => state.friend);
  const dispatch = useDispatch()

  useEffect(() => {
    // Register the userId with the server when the user connects
    socket.emit('register', info?.friendId);

    // Listen for private messages
    socket.on('private message', (msg) => {
      dispatch(setChat({ message: msg?.message, time: msg?.timestamp }))
    });

    return () => {
      socket.off('private message');
    };
  }, [dispatch, info?.friendId]);

  return (
    <Box>
      <RenderButton flag={flag} info={info} />
      <div style={{ marginTop: '12px' }}>
        {Array.isArray(chats) && chats.length > 0 && chats.map((chat, index) => (
          (chat.senderId !== uid) ? (
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