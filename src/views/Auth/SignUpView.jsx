/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import { Box, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import FormikField from '../../components/TextBox/FormikField'
import { signUpValidationSchema } from '../../validations/auth';
import { clearToastMessage, signUp } from '../../store/auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import AccountProfileIcon from '../../icons/AccountProfileIcon';
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import GoogleOAuthWrapper from '../../components/Button/OAuthButton'

export default function SignUpView({ setView, setLoadingView }) {
    const { loading, statusCode, toast: msg } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (statusCode == '201' && msg.length > 0) {
            toast.success('User created successfully')
        }
        else if (statusCode.toString().length > 0 && statusCode != '201' && msg.length > 0) {
            if (msg.length > 0) toast.error(msg)
        }
    }, [msg, statusCode])

    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(resolve, 1000)
        }).then(() => {
            dispatch(clearToastMessage())
        })
    }, [dispatch, msg])

    return (
        <Box style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', width: '100%', height: '90vh' }}>
            <AccountProfileIcon />
            <Formik
                initialValues={{ firstname: '', lastname: '', username: '', password: '' }}
                validationSchema={signUpValidationSchema}
                onSubmit={async (values, { resetForm }) => {
                    dispatch(signUp(values))
                    resetForm()
                }}
            >
                {({ values, handleBlur, handleChange, }) => {
                    return (
                        <>
                            <Form>
                                <Box style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px', justifyContent: 'center', alignItems: 'center' }}>
                                    <FormikField
                                        value={values.firstname}
                                        name={'firstname'}
                                        component={TextField}
                                        label={'First Name'}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        disabled={loading}
                                    />
                                    <FormikField
                                        value={values.lastname}
                                        name={'lastname'}
                                        component={TextField}
                                        label={'Last Name'}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        disabled={loading}
                                    />
                                    <FormikField
                                        value={values.username}
                                        name={'username'}
                                        component={TextField}
                                        label={'Username'}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        disabled={loading}
                                    />
                                    <FormikField value={values.password}
                                        name={'password'}
                                        component={TextField}
                                        label={'Password'}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        disabled={loading}
                                    />
                                    <Button startIcon={loading ? <CircularProgress color='success' size={'0.9rem'} /> : null} disabled={loading} type='submit' variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '120px' }}>Sign Up</Button>
                                    <Button disabled={loading} onClick={() => setView(false)} variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '140px', marginTop: 12 }}>Go To Login</Button>
                                    <GoogleOAuthWrapper setLoadingView={setView} />
                                </Box>
                            </Form>
                        </>
                    )
                }}
            </Formik>
        </Box>
    )
}
