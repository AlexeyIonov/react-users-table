import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import Comments from './comments';
import UserCard from './userCard';
import QualitiesCard from './qualitiesCard';
import MeetingsCard from './meetingsCard';

const UserPage = ({ userId }) => {
    // const history = useHistory();
    // const handleUsersRoute = () => {
    //     history.push('/users');
    // };
    const [user, setUser] = useState();
    const [allUsers, setAllUsers] = useState();
    // const [comments, setComments] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.users.fetchAll().then((data) => setAllUsers(data));
        // api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);

    // const handleUserEdit = () => {
    //     history.push(`/edit/${userId}`);
    // };

    // const handleSelectUser = (id) => {
    //    console.log('handleSelectUser', id);
    // };

    console.log('UserPage 222', user);
    return (
        user && allUsers
            ? (
                <div className='container'>
                    <div className='row gutters-sm'>
                        <div className='col-md-4 mb-3'>
                            <UserCard user={user}></UserCard>
                            <QualitiesCard data={user.qualities}></QualitiesCard>
                            <MeetingsCard value={user.completedMeetings}></MeetingsCard>
                        </div>
                        <div className='col-md-8'>
                            <Comments />
                        </div>
                        {/* <div className='d-flex justify-content-center'>
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
                                    {<Link to={'/users'} className='btn btn-primary'>Все пользователи</Link>}
                                    {<Link to={`/users/${userId}/edit`} className='btn btn-primary'>Редактировать</Link>}
                                </div>
                            </div>
                        </div> */}
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
