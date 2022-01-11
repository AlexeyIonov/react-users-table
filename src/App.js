import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './component/navBar';
import Login from './component/login';
import Users from './component/users';
import Main from './component/main';
import NotFound from './component/notFound';

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path='/' exact component={Main}/>
                <Route path='/login' component={Login}/>
                <Route path='/users/:userId?' component={Users}/>
                <Route path='/404' component={NotFound}/>
                <Redirect from='/admin' to='/users/:user?'/>
                <Redirect to='/404'/>
            </Switch>
        </div>
    );
}

App.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default App;
