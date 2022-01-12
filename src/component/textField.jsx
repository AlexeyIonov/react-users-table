import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, id, value, onChange }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                className="form-control"
                type={type}
                id={id}
                value={value}
                onChange={onChange}/>
        </div>
    );
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default TextField;
