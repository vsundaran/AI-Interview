import React from 'react';
// import GoogleLogin from 'react-google-login';

import { GoogleLogin } from '@react-oauth/google';
import { setToken, getUserFromToken } from '../../utills/auth';
import API from '../../api/api';

const GoogleAuth = () => {
    const handleLoginSuccess = async (response) => {
        try {
            const { credential } = response;

            // Send Google token to backend
            const res = await API.post('/auth/google-signin', { token: credential });

            // Save JWT and user info
            const { token, user } = res.data;
            setToken(token);

            alert(`Welcome, ${user.name}!`);

            // You can retrieve user details using getUserFromToken()
            console.log(getUserFromToken());
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
        }
    };

    const handleLoginFailure = (error) => {
        console.error('Google Sign-In failed:', error);
    };

    return (
        <div>
            <h2>Sign in with Google</h2>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
            />
        </div>
    );
};

export default GoogleAuth;