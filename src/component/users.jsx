import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import api from '../api';
import UsersTable from './usersTable';
import User from './user';
import _ from 'lodash';

const Users = ({ match }) => {
    const pageSize = 8;
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProfession, setSelectedProfession] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const userId = match.params.userId;
    const [userToRender, setUserToRender] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUserToRender(data);
        });
    }, [userId]);

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((tag) => tag._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        // console.log('handleToggleBookmark', id);

        const newUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark === false
                    ? (user.bookmark = true)
                    : (user.bookmark = false);
            }
            return user;
        });
        setUsers(newUsers);
    };

    useEffect(() => {
        // console.log('render');
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProfession]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProfession(item);
    };

    const clearFilter = () => {
        setSelectedProfession();
    };

    const handleSort = (item) => {
        // console.log('Users: handleSort', item);
        setSortBy(item);
    };

    const renderGroupListBox = () => {
        return (
            <>
                <GroupList
                    selectedItem={selectedProfession}
                    items={professions}
                    onItemSelect={handleProfessionSelect}
                />
                <button
                    className="btn btn-secondary mt-2"
                    onClick={clearFilter}
                >
                    Очистить
                </button>
            </>
        );
    };

    const renderUsers = (usersOnPage, countOfFilteredUsers) => {
        return (
            <div className="d-flex justify-content-center p-3">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0">
                        {renderGroupListBox()}
                    </div>
                )}
                {countOfFilteredUsers >= 0 && (
                    <div className="d-flex flex-column m-2">
                        {<SearchStatus length={countOfFilteredUsers} />}
                        {<UsersTable
                            users={usersOnPage}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookmark={handleToggleBookmark}
                            onDeleteUser={handleDelete}
                        />}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={countOfFilteredUsers}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    if (users) {
        if (userId) {
            // console.log('UserId', userId, userToRender);
            return <User user={userToRender}/>;
        } else {
            const filteredUsers =
                selectedProfession ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProfession)) : users;
            const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);
            const usersOnPage = paginate(sortedUsers, currentPage, pageSize);
            const countOfFilteredUsers = filteredUsers.length;
            return renderUsers(usersOnPage, countOfFilteredUsers);
        }
    } else {
        return <h1 className='d-flex justify-content-center'>Loading ...</h1>;
    }
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    match: PropTypes.object,
    onToggleBookmark: PropTypes.func
};

export default Users;
