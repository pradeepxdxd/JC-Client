import React from 'react'
import Main from './pages/Main'
import ErrorBoundary from './error/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  )
}
