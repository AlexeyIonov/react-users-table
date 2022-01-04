import React from 'react'

const Qualities = ({color, name, id}) => {    
    return (
        <span className={"badge m-1 bg-" + color} key={id}>
            {name}
        </span>
    );
}

export default Qualities;