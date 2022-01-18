import React, { useState, useEffect } from 'react';
import TextField from './textField';

const LoginForm = () => {
    const [inputData, setInputData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateInput();
    }, [inputData]);

    const isValidEmail = (email) => {
        const regExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
        return regExp.test(email);
    };

    const handleInputData = ({ target }) => {
        setInputData((prevState) => ({
            ...prevState,
            [target.id]: target.value
        }));
        console.log('Name', target.id, 'Value', target.value, isValidEmail(target.value));
    };

    const validateInput = () => {
        const errors = {};
        for (const fieldName in inputData) {
            if (inputData[fieldName].trim() === '') {
                errors[fieldName] = `${fieldName} should not be empty`;
            } else if (fieldName === 'email' && isValidEmail(inputData[fieldName]) === false) {
                errors[fieldName] = `${fieldName} email does not match criteria 'your@email.com'`;
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateInput();
        console.log('Is vaild input', isValid);
    };

    return (
        <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Email address'
                    type='text'
                    id='email'
                    value={inputData.email}
                    onChange={handleInputData}
                    error={errors.email}
                />
                <TextField
                    label='Password'
                    type='password'
                    id='password'
                    value={inputData.password}
                    onChange={handleInputData}
                    error={errors.password}
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
