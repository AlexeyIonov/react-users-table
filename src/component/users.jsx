import React, {useState} from 'react'
import api from '../api'
const Users=()=> {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(prevState=>prevState.filter(tag=>tag._id!==userId));
    }

    const handlePhrase = (number) => {
        console.log('New count', number)
        let prefix;
        if(number === 0) {
            prefix = 'Никто не тусанет';
        } else {
            let digit = +number.toString().split('').pop();
            switch(digit) {
                case 1: 
                case 5: 
                case 6: 
                case 7: 
                case 8: 
                case 9: 
                case 0: {
                    prefix = `${number} человек тусанет`;
                    break;
                }
                case 2: 
                case 3: 
                case 4: { 
                    prefix = `${number} человека тусанут`; 
                    break;
                }
                default: break;
            }

            switch(number) {
                case 11:
                case 12:
                case 13:
                case 14: {
                    prefix = `${number} человек тусанет`;
                    break;
                }
                default: break;
            }

            console.log(number.toString(), number.toString().slice(-1));
        }

        const phrase = `${prefix} с тобой сегодня`;        
        return <span className='badge btn-primary m-2'>{phrase}</span>
    }

    const renderBadges=(qualities)=>{
        const ret = qualities.map((q) => {
                    let color = qualities.filter(c => c === q);
                    if(color?.length === 0) {
                        color = 'primary'
                    }
                    let classNam = `badge btn-${color[0].color} m-2`;
                    return <span className={classNam} key={color[0]._id}>{q.name}</span>
                });
        return ret;
    }

    const renderTableContent=()=>{
        return (
            users.map((user)=>(
                <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{renderBadges(user.qualities)}</td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}/5</td>
                        <td>{<button className='btn btn-primary btn-sm m-2' onClick={()=>handleDelete(user._id)}>Delete</button>}</td>
                </tr>))
        );
    }

    const renderTable=()=>{
        if(users.length) {
            return <div>
                        {handlePhrase(users.length)} <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">{/* Delete button */}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderTableContent()}
                        </tbody>
                        </table>
                    </div>
        }
        else {
            return <div>{handlePhrase(users.length)}</div>
        }
    }

    return renderTable();
}

export default Users;