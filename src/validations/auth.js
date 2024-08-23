import { object, string } from 'yup'

export const loginValidationSchema = object({
    username: string()
        .required('Username is required')
        .matches(/^\S*$/, 'Password must not contain spaces'),
    password: string()
        .required('Password is required')
        .matches(/^\S*$/, 'Password must not contain spaces'),
})

export const signUpValidationSchema = object({
    firstname: string()
        .required('First Name is required')
        .min(3, 'First Name more than 3 character')
        .max(10, 'First Name should be less than 10')
        .matches(/^\S*$/, 'First Name must not contain spaces')
        .matches(/^[A-Z][a-z]*$/, 'First name must start with a capital letter and contain only letters'),
    lastname: string()
        .required('Last Name is required')
        .min(3, 'Last Name more than 3 character')
        .max(10, 'Last Name should be less than 10')
        .matches(/^\S*$/, 'Last Name must not contain spaces')
        .matches(/^[A-Z][a-z]*$/, 'Last name must start with a capital letter and contain only letters'),
    username: string()
        .required('Username is required')
        .min(3, 'Username more than 3 character')
        .max(10, 'Username should be less than 10')
        .matches(/^\S*$/, 'Username must not contain spaces'),
    password: string()
        .required('Password is required')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%#^*?&]/, 'Password must contain at least one special character')
        .matches(/^\S*$/, 'Password must not contain spaces')
        .min(6, 'Password should be more than 6 character')
        .max(20, 'Password should be less than 10'),
})