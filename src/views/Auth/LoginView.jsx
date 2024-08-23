/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountProfileIcon from '../../icons/AccountProfileIcon'
import FormikField from '../../components/TextBox/FormikField'
import { loginValidationSchema } from '../../validations/auth';
import { clearToastMessage, login } from '../../store/auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';

export default function LoginView({ setView }) {
  const [open, setOpen] = useState(false);

  const { statusCode, toast : msg } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (statusCode == '401' && msg.length > 0) {
      handleClose()
      toast.error('Username and Password Incorrect!')
    }
    else if (statusCode == '500' && msg.length > 0) {
      handleClose()
      toast.error('Something went wrong')
    }
    dispatch(clearToastMessage())
  }, [dispatch, statusCode])

  return (
    <Box style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', width: '100%', height: '90vh' }}>
      <AccountProfileIcon/>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleOpen()
          dispatch(login(values))
          resetForm();
        }}
      >
        {({ values, handleBlur, handleChange, ...props }) => {
          return (
            <>
              <Form>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '400px',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <FormikField
                    value={values.username}
                    type={'text'}
                    name={'username'}
                    component={TextField}
                    label={'Username'}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    props={{ ...props }}
                  />
                  <FormikField
                    value={values.password}
                    type={'password'}
                    name={'password'}
                    component={TextField}
                    label={'Password'}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    props={{ ...props }}
                  />
                  <Button type='submit' variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '120px' }}>Sign In</Button>
                  <Button onClick={() => setView(true)} variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '140px', marginTop: 12 }}>Go To Sign Up</Button>
                </Box>
              </Form>
            </>
          )
        }}
      </Formik>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </Box>
  )
}
