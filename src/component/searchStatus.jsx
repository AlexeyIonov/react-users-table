import React from 'react';

const SearchStatus = ({ length }) => {
    const handlePhrase = (number) => {
        let prefix;
        if (number === 0) {
            prefix = 'Никто не тусанет';
        } else {
            const digit = +number.toString().split('').pop();
            switch (digit) {
            case 0:
            case 1:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9: {
                prefix = `${number} человек тусанет`;
                break;
            }
            case 2:
            case 3:
            case 4: {
                prefix = `${number} человека тусанет`;
                break;
            }
            default:
                break;
            }

            const lastTwoDigits = +number.toString().slice(-2);
            switch (lastTwoDigits) {
            case 11:
            case 12:
            case 13:
            case 14: {
                prefix = `${number} человек тусанет`;
                break;
            }
            default:
                break;
            }
        }

        const phrase = `${prefix} с тобой сегодня`;
        return (
            <h1>
                <span
                    className={'badge ' + (Number(number) > 0 ? 'bg-primary' : 'bg-danger')}
                >
                    {phrase}
                </span>
            </h1>
        );
    };

    return handlePhrase(length);
};

export default SearchStatus;
