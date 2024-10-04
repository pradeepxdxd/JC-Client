import React, { useMemo } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import Inbox from '../../components/Inbox/Inbox'
import { useDispatch, useSelector } from 'react-redux'
import { setLogger } from '../../store/profile/profile.slice'

export default function Right() {
  const { name, logger } = useSelector(state => state.profileSlice)
  const { flag } = useSelector(state => state.friend)

  const dispatch = useDispatch();

  const isUserSelected = useMemo(() => {
    if (flag === '' && name === '') return false
    else {
      dispatch(setLogger(5));
      return true
    }
  }, [dispatch, flag, name])

  return (
    <>
      {
        logger > 0 ? <Inbox /> : !isUserSelected ? <Dashboard /> : <Inbox />
      }
    </>
  )
}
