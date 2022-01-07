import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Users from './component/users';
// import SearchStatus from './component/searchStatus';
import api from './api';

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
            // setDisplayUsersCount(data.length);
        });
    }, []);
    // const [displayedUsersCount, setDisplayUsersCount] = useState();

    const handleDelete = (userId) => {
        console.log('handleDelete', userId);
        setUsers((prevState) => prevState.filter((tag) => tag._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        console.log('handleToggleBookmark', id);

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

    const handleDisplayedUsers = (usersCount) => {
        // setDisplayUsersCount(usersCount);
        console.log('handleDisplayedUsers', usersCount);
    };

    return (
        <div className="d-flex flex-column p-3">
            {/* {displayedUsersCount && <SearchStatus length={displayedUsersCount} />} */}
            {users && (
                <Users
                    users={users}
                    onDeleteUser={handleDelete}
                    onChangeBookmark={handleToggleBookmark}
                    onChangeDisplayedUsers={handleDisplayedUsers}
                />
            )}
        </div>
    );
}

App.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rest: PropTypes.func
};

export default App;
