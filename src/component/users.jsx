import React, { useState } from "react";
import User from "./user";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const usersOnPage = paginate(users, currentPage, pageSize);

    const handlePageChange = (pageIndex) => {
        console.log("handlePageChange", pageIndex);
        setCurrentPage(pageIndex);
    };

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

    const renderUsersTable = () => {
        return (
            <>
                {count > 0 && (
                    <div>
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
                    </div>
                )}
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    };

    return renderUsersTable();
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rest: PropTypes.func
};

export default Users;
