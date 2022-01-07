import React, { useState, useEffect } from 'react';
import User from './user';
import PropTypes from 'prop-types';
import Bookmark from './bookmark';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import api from '../api';

const Users = ({ users, ...rest }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProfession, setSelectedProfession] = useState();
    const filteredUsers = selectedProfession
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProfession)
          )
        : users;
    console.log('selectedProfession', selectedProfession);
    const usersOnPage = paginate(filteredUsers, currentPage, pageSize);
    const countOfFilteredUsers = filteredUsers.length;
    rest.onChangeDisplayedUsers(countOfFilteredUsers);

    useEffect(() => {
        console.log('render');
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProfession]);

    const handlePageChange = (pageIndex) => {
        // console.log('handlePageChange', pageIndex);
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        console.log('handleProfessionSelect', item);
        setSelectedProfession(item);
    };

    const clearFilter = () => {
        setSelectedProfession();
    };

    console.log(professions);

    const renderTableContent = () => {
        return usersOnPage.map((user) => (
            <User
                {...user}
                {...rest}
                key={user._id}
                buttonDelete={
                    <button
                        onClick={() => rest.onDeleteUser(user._id)}
                        className="btn btn-danger btn-sm"
                    >
                        Удалить
                    </button>
                }
                bookmarkIcon={
                    <Bookmark status={user.bookmark} id={user._id} {...rest} />
                }
            />
        ));
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

    const renderUsers = () => {
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0">
                        {renderGroupListBox()}
                    </div>
                )}
                {countOfFilteredUsers >= 0 && (
                    <div className="d-flex flex-column m-2">
                        {<SearchStatus length={countOfFilteredUsers} />}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Качества</th>
                                    <th scope="col">Профессия</th>
                                    <th scope="col">Встретился, раз</th>
                                    <th scope="col">Оценка</th>
                                    <th scope="col">Избранное</th>
                                    <th scope="col">{/* Delete button */}</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableContent()}</tbody>
                        </table>
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

    return renderUsers();
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rest: PropTypes.func,
    onChangeDisplayedUsers: PropTypes.func
};

export default Users;
