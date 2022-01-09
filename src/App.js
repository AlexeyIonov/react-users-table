import React from 'react';
import PropTypes from 'prop-types';
import Users from './component/users';

function App() {
    return (
        <Users />
    );
}

App.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default App;
