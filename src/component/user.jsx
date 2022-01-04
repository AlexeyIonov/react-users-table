import React from 'react'
import Qualities from './qualities';
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = (user, {...rest}) => {    
    return <tr key={user._id}>
        <td>{user.name}</td>        
        <td>{user.qualities.map((usr) => (
            <Qualities key={usr._id} color={usr.color} name={usr.name} id={usr._id} />
        ))}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        {/* <td>{<Bookmark status={user.bookmark} id={user._id} {...rest}/>}</td> */}
        <td>{user.bookmarkIcon}</td>
        <td>{user.buttonDelete}</td>        
    </tr>
};

User.propTypes = {
    user: PropTypes.object,
    rest: PropTypes.func
};

export default User;