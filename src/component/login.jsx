import React, { useState, useEffect } from 'react';
import TextField from './textField';

const Login = () => {
    const [inputData, setInputData] = useState({ email: '', password: '' });
    const [, setErrors] = useState();

    useEffect(() => {
        validateInput();
    }, [inputData]);

    const isValidEmail = (email) => {
        const regExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
        return regExp.test(email);
    };

    const handleInputData = ({ target }) => {
        setInputData((prevState) => ({
            // ...prevState,
            [target.id]: target.value
        }));
        console.log('Name', target.id, 'Value', target.value, isValidEmail(target.value));
    };

    const validateInput = () => {
        const errors = {};
        for (const fieldName in inputData) {
            if (inputData[fieldName].trim() === '') {
                errors[fieldName] = `${fieldName} have to be filled`;
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
                    type='email'
                    id='email'
                    value={inputData.email}
                    onChange={handleInputData}/>
                <TextField
                    label='Email address'
                    type='password'
                    id='password'
                    value={inputData.password}
                    onChange={handleInputData}/>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
