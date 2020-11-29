import React from 'react';
import './message.css'
import { useDispatch } from 'react-redux';
import {
    changeDoneStatus
  } from './mesagesSlice';
  import dayjs from 'dayjs'

export function Message(props) {
    const dispatch = useDispatch();

    return <div className={`messageContainer ${props.isDone && 'done'}`} 
        onClick={() => dispatch(changeDoneStatus(props.id))}>
        <div>
            {props.message}
            <span className='gray'>
                {dayjs(props.time).format(' (HH:mm)')}
            </span>
        </div>
    </div>
}