import React from 'react';
import Qualities from './qualities';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const UserPage = ({ user }) => {
    const history = useHistory();
    const handleUsersRoute = () => {
        history.push('/users');
    };
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
                    <button onClick={handleUsersRoute}>Все пользователи</button>
                </div>
            </div>)
            : (<div className='d-flex justify-content-center'>Загрузка данных о пользователе</div>)
    );
};

UserPage.propTypes = {
    user: PropTypes.object
};

export default UserPage;
