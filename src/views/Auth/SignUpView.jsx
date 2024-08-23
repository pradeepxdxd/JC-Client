import React from 'react'
import { Box, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import FormikField from '../../components/TextBox/FormikField'
import { signUpValidationSchema } from '../../validations/auth';
import { signUp } from '../../store/auth/auth.slice';
import { useDispatch } from 'react-redux';
import AccountProfileIcon from '../../icons/AccountProfileIcon';

export default function SignUpView({ setView }) {
    const dispatch = useDispatch()
    return (
        <Box style={{ color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', width: '100%', height: '90vh' }}>
            <AccountProfileIcon />
            <Formik
                initialValues={{ firstname: '', lastname: '', username: '', password: '' }}
                validationSchema={signUpValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    dispatch(signUp(values))
                    resetForm()
                }}
            >
                {({ values, handleBlur, handleChange }) => {
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
                                    />
                                    <FormikField
                                        value={values.lastname}
                                        name={'lastname'}
                                        component={TextField}
                                        label={'Last Name'}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                    <FormikField
                                        value={values.username}
                                        name={'username'}
                                        component={TextField}
                                        label={'Username'}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                    <FormikField value={values.password}
                                        name={'password'}
                                        component={TextField}
                                        label={'Password'}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                    <Button type='submit' variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '120px' }}>Sign Up</Button>
                                    <Button onClick={() => setView(false)} variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '140px', marginTop: 12 }}>Go To Login</Button>
                                </Box>
                            </Form>
                        </>
                    )
                }}
            </Formik>
        </Box>
    )
}
