import React, { useEffect, useState, useRef } from 'react'
import dayjs from 'dayjs'
import './game.css'

export function Timer(props) {
    /**
     * state of Timer component
     * timer - value for stopwatch
     * addSecond - function with setTimeout
     */
    const [timer, setTimer] = useState(dayjs().set('minute', 0).set('second', 0));
    const addSecond = useRef(null);
    
    useEffect(() => {
        clearTimeout(addSecond.current);
        if(!props.stop) {
            setTimer(dayjs().set('minute', 0).set('second', 0));
            addSecond.current = setInterval(() => {
                setTimer(timer => timer.add(1, 'second'));
            }, 1000);
        }
    }, [props.round, props.stop]);

    return <>
        <div className="gameTimerSpot">
           {props.stop ? `Congratulation your time: ${timer.format('mm:ss')}. Play again?` : timer.format('mm:ss')}
        </div>
    </>
}