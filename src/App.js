import React from 'react'
import Main from './pages/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VideoCall from './pages/Videocall/VideoCall'
import Clock from './pages/Clock/Clock'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/room/:roomId' element={<VideoCall />} />
          <Route path='/clock' element={<Clock />} />
        </Routes>
      </Router>
    </>
  )
}
