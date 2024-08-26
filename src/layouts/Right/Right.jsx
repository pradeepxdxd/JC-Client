import React, { useMemo, useState } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import Inbox from '../../components/Inbox/Inbox'
import { useSelector } from 'react-redux'

export default function Right() {
  const [counter, setCounter] = useState(0)

  const { name } = useSelector(state => state.profileSlice)
  const { flag } = useSelector(state => state.friend)

  const isUserSelected = useMemo(() => {
    if (flag === '' && name === '') return false
    else {
      setCounter(5)
      return true
    }
  }, [flag, name])

  return (
    <>
      {
        // isUserSelected ? <Inbox /> : <Dashboard />
        counter > 0 ? <Inbox /> : !isUserSelected ? <Dashboard /> : <Inbox />
      }
    </>
  )
}
