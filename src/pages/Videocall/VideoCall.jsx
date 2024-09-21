import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { getUserId, getUserName } from '../../utils/auth'

export default function VideoCall() {
  const { roomId } = useParams()
  const meetingRef = useRef(null)

  useEffect(() => {
    const appID = Number(process.env.REACT_APP_ZEGO_APP_ID)
    const serverSecret = `${process.env.REACT_APP_ZEGO_SERVER_SECRET}`

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, getUserId(), getUserName())

    const zc = ZegoUIKitPrebuilt.create(kitToken)

    zc.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall
      },
      showScreenSharingButton: true,
      showRoomTimer: true
    })

    return () => {
      zc.destroy() // Properly clean up resources when the component unmounts
    }
  }, [roomId])

  return <div ref={meetingRef} />
}
