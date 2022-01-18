import React, { useState } from 'react';
import LoginForm from '../component/loginForm';

const Login = () => {
    const [fromType, setFormType] = useState('login');
    return (
        <LoginForm />
    );
};

export default Login;
