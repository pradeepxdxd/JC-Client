import { Field } from 'formik'
import React from 'react'

export default function FormikField({ name, component, label, value, handleBlur, disabled, customStyle }) {
    return (
        <>
            <Field
                fullWidth
                name={name}
                component={component}
                label={label}
                onBlur={handleBlur}
                value={value}
                disabled={disabled}
                InputProps={{
                    style: { color: 'gray' },
                    disableUnderline: true,
                }}
                InputLabelProps={{
                    style: { color: 'gray' }
                }}
                autoComplete='off'
                sx={{
                    width: !!customStyle?.width ? customStyle?.width : '400px',
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
                    '& .MuiInputBase-input.Mui-disabled': {
                        color: 'gray',  // Ensures text is gray when disabled
                        '-webkit-text-fill-color': 'gray',  // For webkit browsers
                    },
                    '@media (max-width:445px)': {
                        width: '300px',
                    },
                    '@media (max-width:314px)': {
                        width: '230px',
                    },
                }}
            />
        </>
    )
}
