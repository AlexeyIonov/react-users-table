import React from "react";

const SearchStatus = ({ length }) => {
    const handlePhrase = (number) => {
        // console.log('SearchStatus', number)

        let prefix;
        if (number === 0) {
            prefix = "Никто не тусанет";
        } else {
            let digit = +number.toString().split("").pop();
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

            let lastTwoDigits = number.toString().slice(-2);
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

            // console.log(number.toString(), number.toString().slice(-1));
        }

        const phrase = `${prefix} с тобой сегодня`;
        return <span className="badge btn-primary m-2">{phrase}</span>;
    };

    return handlePhrase(length);
};

export default SearchStatus;
