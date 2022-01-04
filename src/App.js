import React, { useState } from "react";
import PropTypes from "prop-types";
import Users from "./component/users";
import SearchStatus from "./component/searchStatus";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        console.log("handleDelete", userId);
        setUsers((prevState) => prevState.filter((tag) => tag._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        console.log("handleToggleBookmark", id);

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

    return (
        <div>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDeleteUser={handleDelete}
                onChangeBookmark={handleToggleBookmark}
            />
        </div>
    );
}

App.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rest: PropTypes.func
};

export default App;
