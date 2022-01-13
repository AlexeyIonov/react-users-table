import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, id, value, onChange, error }) => {
    return (
        <div className="mb-3">
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <input
                className="form-control"
                type={type}
                id={id}
                value={value}
                onChange={onChange}/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
