import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./Message";
import { useSelector } from "react-redux";

export default function ChatBox() {
    const { messages } = useSelector(state => state.messageSlice)

    return (
        <Box>
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
                displayName="テスト"
                avatarDisp={false}
            />
            {/* <MessageRight
                message="bss badhiya bhai tu suna"
                timestamp="09:35 pm"
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="まさりぶ"
                avatarDisp={true}
            />
            <MessageRight
                message="Kya chal rha hai"
                timestamp="09:35 pm"
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="まさりぶ"
                avatarDisp={false}
            /> */}
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
        </Box>
    );
}
