import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import './game.css'

export function Timer(props) {
    const [timer, setTimer] = useState(dayjs().set('minute', 0).set('second', 0));
    const [timeO, setTimeO] = useState();
    useEffect(() => {
        setTimer(dayjs().set('minute', 0).set('second', 0));
        clearTimeout(timeO);
        setTimeO(setInterval(() => {
            console.log(timer.format());
            setTimer(timer.add(1, 'second'));
        }, 1000));
    }, [props.round])



    return <>
        <div className="gameTimerSpot">
            {timer.format('mm:ss')}
        </div>
    </>
}