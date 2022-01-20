import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import TextField from './textField';
import SelectField from './common/form/selectField';
import RadioField from './common/form/radioField';
import MultiSelectField from './common/form/multiSelectField';
import { validator } from '../utils/validator';

const UserEditForm = () => {
    const params = useParams();
    const userId = params.userId;
    const [data, setData] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const optionsArray = (options) => {
        return !Array.isArray(options) && typeof options === 'object'
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id,
                color: options[optionName].color
            }))
            : options;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одно число'
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
            }
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        console.log('UserEditForm::handleChange', target);
        if (target && target?.name === 'qualities') {
            const quals = target?.value.map((opt) => ({
                name: opt.label,
                _id: opt.value,
                color: opt.color
            }));
            console.log('qualities', quals);
            setData((prevState) => ({ ...prevState, qualities: quals }));
        } else if (target && target?.name === 'profession') {
            const key = Object.keys(professions).filter((k) => professions[k]._id === target.value);
            setData((prevState) => ({ ...prevState, profession: { _id: target.value, name: professions[key].name } }));
        } else if (target) {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
            // console.log('UserEditForm::handleChange Name', target.name, 'Value', target.value, 'Target', target);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log('handleSubmit', data);
    };

    return (
        data ? (
            <div className='d-flex col-md-6 offset-md-3 justify-content-center shadow p-4'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Редактирование</h3>
                        <TextField
                            label='Имя'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label='Электронная почта'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        {/* <TextField
                            label='Пароль'
                            type='password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        /> */}
                        <SelectField
                            label='Выбери свою профессию'
                            defaultOption='Choose...'
                            options={professions}
                            name='profession'
                            onChange={handleChange}
                            value={data.profession._id}
                            error={errors.profession}
                        />
                        <MultiSelectField
                            options={optionsArray(qualities)}
                            onChange={handleChange}
                            // defaultValue={[{label: 'Нудила', value: '67rdca3eeb7f6fgeed471198'}, {label: 'Троль', value: '67rdca3eeb7f6fgeed4711012'}]}
                            defaultValue={optionsArray({ ...data.qualities })}
                            name='qualities'
                            label='Выберите ваши качества'
                        />
                        <RadioField
                            options={[
                                { name: 'Male', value: 'male' },
                                { name: 'Female', value: 'female' },
                                { name: 'Other', value: 'other' }
                            ]}
                            value={data.sex}
                            name='sex'
                            onChange={handleChange}
                            label='Выберите ваш пол'
                        />
                        <button
                            className='btn btn-primary w-100 mx-auto'
                            onClick={handleSubmit}
                            disabled={!isValid}>
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        ) : (<div className='d-flex justify-content-center'>Загрузка данных о пользователе</div>)
    );
};

export default UserEditForm;
