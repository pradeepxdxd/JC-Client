import { Field } from 'formik'
import React from 'react'

export default function FormikField({ name, component, label, value, handleBlur, props }) {
    return (
        <>
            <Field
                fullWidth
                name={name}
                component={component}
                label={label}
                onBlur={handleBlur}
                value={value}
                InputProps={{
                    style: { color: 'gray' },
                    disableUnderline: true,
                }}
                InputLabelProps={{
                    style: { color: 'gray' }
                }}
                autoComplete='off'
                sx={{
                    width: '400px',
                    marginBottom: '30px',
                    borderRadius: '4px',
                    backgroundColor: '#2c343d',  // Example sx prop usage
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent',  // Removes the default border
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent',  // Keeps border transparent on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent',  // Removes blue border on focus
                        },
                    },

                    '@media (max-width:445px)' : {
                        width: '300px',
                    },
                    '@media (max-width:314px)' : {
                        width: '230px',
                    },
                }}
            />
        </>
    )
}
