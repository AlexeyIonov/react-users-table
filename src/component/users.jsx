import React from 'react'
import User from './user'
import PropTypes from "prop-types";
import Bookmark from "./bookmark";

const Users = ({ users, ...rest }) => {           
    const renderTableContent = () => {
        return (
            users.map((user)=>(
                <User 
                    {...user}
                    {...rest}
                    buttonDelete={
                        <button
                            onClick={() => rest.onDeleteUser(user._id)}
                            className="btn btn-danger btn-sm">
                            Удалить
                        </button>
                    }
                    bookmarkIcon={
                        <Bookmark status={user.bookmark} id={user._id} {...rest} />
                    }
                />))
        );
    }

    const renderUsersTable = () => {
        if(users.length) {
            return <div>                        
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
                        <tbody>
                            {renderTableContent()}
                        </tbody>
                        </table>
                    </div>
        }
        else {
            return <div/>;
        }
    }

    return renderUsersTable();
}

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rest: PropTypes.func
};

export default Users;