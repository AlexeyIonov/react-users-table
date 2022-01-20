import React, { useEffect, useState } from 'react';
import Qualities from './qualities';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../api';

const UserPage = ({ userId }) => {
    // const history = useHistory();
    // const handleUsersRoute = () => {
    //     history.push('/users');
    // };
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    // const handleUserEdit = () => {
    //     history.push(`/edit/${userId}`);
    // };

    console.log('UserPage', user);
    return (
        user
            ? (<div className='d-flex justify-content-center'>
                <div>
                    <h3>{user.name}</h3>
                    <h1>Профессия: {user.profession.name}</h1>
                    <div className='d-flex justify-content-center'>
                        {user.qualities.map((u) => (
                            <Qualities
                                key={u._id}
                                color={u.color}
                                name={u.name}
                                id={u._id}
                            />
                        ))}
                    </div>
                    <h1>Встретился: {user.completedMeetings}</h1>
                    <h1>Рейтинг: {user.rate}/5</h1>
                    <div className='d-flex justify-content-center'>
                        {/* <button onClick={handleUsersRoute}>Все пользователи</button> */}
                        {<Link to={'/users'} className='btn btn-primary'>Все пользователи</Link>}
                        {<Link to={`/users/${userId}/edit`} className='btn btn-primary'>Редактировать</Link>}
                        {/* <button onClick={handleUserEdit}>Редактировать</button> */}
                    </div>
                </div>
            </div>)
            : (<div className='d-flex justify-content-center'>Загрузка данных о пользователе</div>)
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
    // onEditUser: PropTypes.func.isRequired
};

export default UserPage;
