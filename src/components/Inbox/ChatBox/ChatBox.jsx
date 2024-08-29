import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { MessageLeft, MessageRight } from "../../../views/Chat/Message";
import { useDispatch, useSelector } from "react-redux";
import RenderButton from "./RenderButton";
import { socket } from "../../../configs/socket/socket";
import { setChat } from "../../../store/chat/chat.slice";
import { getUserId } from "../../../utils/auth";
import './index.css'
import { updateFriendList } from "../../../store/friend/friend.slice";

// const socket = io(APP_URL);

export default function ChatBox() {
  const uid = getUserId()
  const { chats } = useSelector(state => state.chat)
  const { flag, info } = useSelector(state => state.friend);
  const dispatch = useDispatch()

  useEffect(() => {
    // Register the userId with the server when the user connects
    socket.emit('register', info?.friendId);

    // Create a unique room for the conversation between the two users
    socket.emit('join room', { userId1: uid, userId2: info?.friendId });

    // Listen for private messages
    socket.on('private message', (msg) => {
      if (info?.friendId === msg.userId1 || info.friendId === msg.userId2)
        dispatch(setChat({ message: msg?.message, time: msg?.timestamp }))
      dispatch(updateFriendList({ message: msg?.message, time: msg?.timestamp, id: info?.friendId }))
    });

    return () => {
      socket.off('private message');
    };
  }, [dispatch, info?.friendId, uid]);

  return (
    <Box>
      <RenderButton flag={flag} info={info} />
      <Box
        className="chat-box-style"
      >
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
      </Box>
    </Box>
  );
}
