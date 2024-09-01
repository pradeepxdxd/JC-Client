import { Box, Button } from '@mui/material';
import { Form, Formik, isEmptyArray } from 'formik';
import React from 'react'
import FormikField from '../TextBox/FormikField';
import { TextField } from 'formik-material-ui';
import { signUpValidationSchema } from '../../validations/auth';
// import { useDispatch } from 'react-redux';
// import { editUserById } from '../../store/auth/user.slice';
import { toast } from 'react-toastify';
import { isObjectEmpty } from '../../utils/object';

export default function ProfileForm({ close, edit, setEdit, data, profileImage }) {
    // const dispatch = useDispatch()

    const handleSave = (val, err, touched) => {
        console.log({ val, err, touched })
        if (!isObjectEmpty(err)) {
            return;
        }
        else if (!isEmptyArray(val)) {
            console.log({ val })
            if (!!profileImage) {
                // dispatch(editUserById({ ...val, profileImage, id: data?._id }))
            }
            else {
                // dispatch(editUserById({ ...val, profileImage: data?.profileImage, id: data?._id }))
            }
            toast.warn('Profile updated!')
            setEdit(false)
        }
    }

    return (
        <Formik
            initialValues={{
                firstname: data?.firstname || '',
                lastname: data?.lastname || ''
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={(values, { resetForm }) => {
                resetForm();
            }}
            enableReinitialize={true}
        >
            {({ values, touched, errors, handleBlur, handleChange, ...props }) => {
                console.log({ errors })
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
                                    value={values.firstname}
                                    type={'text'}
                                    name={'firstname'}
                                    component={TextField}
                                    label={'firstname'}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    props={{ ...props }}
                                    customStyle={{ width: '300px' }}
                                    disabled={edit}
                                />
                                <FormikField
                                    value={values.lastname}
                                    type={'text'}
                                    name={'lastname'}
                                    component={TextField}
                                    label={'lastname'}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    props={{ ...props }}
                                    customStyle={{ width: '300px' }}
                                    disabled={edit}
                                />
                                <Box display={'flex'} sx={{ gap: '9px' }}>
                                    <Button onClick={close} variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '120px' }}>Close</Button>
                                    {
                                        edit ?
                                            <>
                                                <Button onClick={() => setEdit(false)} variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '120px' }}>Edit</Button>
                                            </>
                                            :
                                            <>
                                                <Button onClick={() => handleSave(values, errors, touched)} type='submit' variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', width: '120px' }}>Save</Button>
                                            </>
                                    }
                                </Box>
                            </Box>
                        </Form>
                    </>
                )
            }}
        </Formik>
    )
}