import React from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';

const QualitiesCard = ({ data }) => {
    return (
        <div className='card mb-3'>
            <div
                className='
                    card-body
                    d-flex
                    flex-column
                    justify-content-center
                    text-center'
            >
                <h5 className='card-title'>
                    <span>Qualities</span>
                </h5>
                <p className='card-text'>
                    {data.map((u) => (
                        <Qualities
                            key={u._id}
                            color={u.color}
                            name={u.name}
                            id={u._id}
                        />
                    ))}
                    {/* <span className='badge bg-primary'>Primary</span>
                    <span className='badge bg-secondary'
                        >Secondary</span
                    >
                    <span className='badge bg-success'>Success</span>
                    <span className='badge bg-danger'>Danger</span> */}
                </p>
            </div>
        </div>
    );
};

QualitiesCard.propTypes = {
    data: PropTypes.array
};

export default QualitiesCard;
