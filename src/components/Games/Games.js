import React,{useState} from 'react'


const Games = (props) => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Вы нажали {count} раз</p>
            <button onClick={() => setCount(count + 1)}>
                increment
            </button>
            <button onClick={() => setCount(count -1)}>
                decrement
            </button>
        </div>
    );
}

export default Games;