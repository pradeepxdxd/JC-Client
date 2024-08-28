import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
    return localStorage.getItem('token')
}

export const getUserId = () => {
    const token = localStorage.getItem('token')
    const { userId } = jwtDecode(token)
    return localStorage.getItem('uid') || userId;
}