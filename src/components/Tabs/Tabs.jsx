
import React from 'react'
import CustomButton from './CustomButton'
import { Grid } from '@material-ui/core'

export default function Tabs() {


  return (
    <Grid container item xs={12} style={{ width: '100%' }}>
      <CustomButton tab={'All'} />
      <CustomButton tab={'Unread'} />
      <CustomButton tab={'Group'} />
    </Grid>
  )
}