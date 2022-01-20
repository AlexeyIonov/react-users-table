import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import UserPage from '../component/userPage';
import UsersListPage from '../component/usersListPage';

const Users = () => {
    const params = useParams();
    const { userId } = params;    
    const handleEditUser = (userId) => {
        console.log('handleEditUser', userId);
    };
    return <>{userId ? <UserPage userId={userId} onEditUser={handleEditUser} /> : <UsersListPage />}</>;
};

Users.propTypes = {
    match: PropTypes.object
};

export default Users;
