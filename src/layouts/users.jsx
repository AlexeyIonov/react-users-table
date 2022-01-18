import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import UserPage from '../component/userPage';
import UsersListPage from '../component/usersListPage';

const Users = ({ match }) => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UsersListPage match={match}/>}</>;
};

Users.propTypes = {
    match: PropTypes.object
};

export default Users;
