export const isLoggedIn = () => {
    return localStorage.getItem('token')
}

export const getUserId = () => {
    return localStorage.getItem('uid');
}

export const getUserName = () => {
    return localStorage.getItem('name');
}

export const logout = () => {
    return localStorage.clear();
}