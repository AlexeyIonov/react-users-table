import React, { useState } from 'react';
import TextField from './textField';
import PropTypes from 'prop-types';

const SearchUsers = ({ onSearch }) => {
    const [searchUser, setSearchUser] = useState({ name: '' });

    const handleChange = ({ target }) => {
        setSearchUser((prevState) => ({
            ...prevState,
            [target.id]: target.value
        }));
        onSearch(target.value);
        console.log('SearchUsers => handleChange:', 'name', target.id, 'value', target.value);
    };

    return (
        <div>
            <TextField
                label=''
                type='text'
                id='name'
                value={searchUser.name}
                onChange={handleChange}
                error={''}
            />
        </div>
    );
};

SearchUsers.propTypes = {
    onSearch: PropTypes.func
};

export default SearchUsers;
