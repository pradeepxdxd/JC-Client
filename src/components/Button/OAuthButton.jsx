import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { googleLoginOAuth2 } from '../../store/auth/auth.slice';

const OAuthButton = ({ setLoadingView }) => {
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ['red', 'yellow', 'green', 'blue'];

    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [colors.length]);

    const responseGoogle = async authResult => {
        try {
            if (authResult['code']) {
                dispatch(googleLoginOAuth2(authResult['code']))
                setLoadingView(true)
            }
            else {
                toast.error('Gmail is not verified')
            }
        }
        catch (err) {
            console.error({ err });
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    return (
        <Button onClick={googleLogin} startIcon={<GoogleIcon style={{ color: colors[colorIndex], transition: 'color 0.5s ease-in-out' }} />} variant='contained' style={{ color: 'gray', backgroundColor: '#2c343d', marginTop: 12 }}>Continue with google</Button>
    )
}

const GoogleOAuthWrapper = ({ setLoadingView }) => {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
            <OAuthButton setLoadingView={setLoadingView}></OAuthButton>
        </GoogleOAuthProvider>
    )
}

export default GoogleOAuthWrapper;