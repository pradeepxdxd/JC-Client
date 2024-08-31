import React from 'react'
import Main from './pages/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VideoCall from './pages/Videocall/VideoCall'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/room/:roomId' element={<VideoCall />} />
        </Routes>
      </Router>
    </>
  )
}
