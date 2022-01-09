import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UsersTable = ({ users, onSort, selectedSort, onToggleBookmark, onDeleteUser }) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя'
        },
        qualities: {
            name: 'Качества',
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: {
            path: 'profession.name',
            name: 'Профессия'
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: {
            path: 'rate',
            name: 'Оценка'
        },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    id={user._id}
                    onToggleBookmark={onToggleBookmark}
                    onClick={() => onToggleBookmark(user._id)}
                />)
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDeleteUser(user._id)}
                    className="btn btn-danger btn-sm"
                >
                    Удалить
                </button>
            )
        }
    };

    return <Table {...{ onSort, selectedSort, columns, data: users }}/>;
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired
};

export default UsersTable;
