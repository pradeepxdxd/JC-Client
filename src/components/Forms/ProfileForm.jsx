import { Box, Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react'
import FormikField from '../TextBox/FormikField';
import { TextField } from 'formik-material-ui';
import { signUpValidationSchema } from '../../validations/auth';
import { useDispatch } from 'react-redux';
import { editUserById } from '../../store/auth/user.slice';
import { toast } from 'react-toastify';

export default function ProfileForm({ close, edit, setEdit, data, profileImage }) {
    const [visiblity, setVisiblity] = useState(data?.visiblity || '');
    const dispatch = useDispatch()

    const showVisiblity = useMemo(() => {
        if (visiblity) return visiblity;
        return data?.visiblity
    }, [data, visiblity])

    const handleSave = () => {
        if (!!profileImage) {
            dispatch(editUserById({ ...data, profileImage, id: data?._id, visiblity: showVisiblity }))
            toast.success('Profile updated successfully')
        }
        else {
            dispatch(editUserById({ ...data, id: data?._id, visiblity: showVisiblity }))
            toast.success('Profile updated successfully')
        }
    }

    return (
        <Formik
            initialValues={{
                firstname: data?.firstname || '',
                lastname: data?.lastname || '',
                visiblity: data?.visiblity || '',
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={(values, { resetForm }) => {
                resetForm();
            }}
            enableReinitialize={true}
        >
            {({ values, touched, errors, handleBlur, handleChange, ...props }) => {
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
                                    Typography={'firstname'}
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
                                    Typography={'lastname'}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    props={{ ...props }}
                                    customStyle={{ width: '300px' }}
                                    disabled={edit}
                                />

                                <Box display={'flex'} gap={2} sx={{
                                    '& input:disabled': {
                                        backgroundColor: 'white',  // Set the background color for disabled state
                                        opacity: 1,  // Ensure that the disabled radio buttons are fully visible
                                        pointerEvents: 'none',  // Disable interaction but still visible
                                    }
                                }}>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '4px' }}>
                                        <input disabled={edit} type="radio" id="public" name="visibility" value="PUBLIC" checked={showVisiblity === 'PUBLIC'} onChange={() => setVisiblity('PUBLIC')} />
                                        <Typography style={{ color: 'white' }}>Public</Typography>
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '4px' }}>
                                        <input disabled={edit} type="radio" id="protected" name="visibility" value="PROTECTED" checked={showVisiblity === 'PROTECTED'} onChange={() => setVisiblity('PROTECTED')} />
                                        <Typography style={{ color: 'white' }}>Protected</Typography>
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '4px' }}>
                                        <input disabled={edit} type="radio" id="private" name="visibility" value="PRIVATE" checked={showVisiblity === 'PRIVATE'} onChange={() => setVisiblity('PRIVATE')} />
                                        <Typography style={{ color: 'white' }}>Private</Typography>
                                    </label>
                                </Box>


                                <Box mt={2} display={'flex'} sx={{ gap: '9px' }}>
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
