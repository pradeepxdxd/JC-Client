import React, { useMemo } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import Inbox from '../../components/Inbox/Inbox'
import { useSelector } from 'react-redux'

export default function Right() {
  const {name} = useSelector(state => state.profileSlice)
  
  const isUserSelected = useMemo(() => {
    if (name === '') return false
    else return true
  }, [name])

  return (
    <>
      {
        isUserSelected ? <Inbox /> : <Dashboard />
      }
    </>
  )
}
