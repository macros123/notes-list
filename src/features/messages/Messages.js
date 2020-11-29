import React, { useState } from 'react';
import { Message } from './Message';
import './message.css'
import { useSelector, useDispatch } from 'react-redux';
import {
    addMessage,
    changeShowType,
    deleteDone,
    selectState
  } from './mesagesSlice';


export function Messages() {
    const state = useSelector(selectState);
    const dispatch = useDispatch();

    const [input, setInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addMessage(input));
        setInput('');
    }

    const messagesList = state.list
        .filter(element => state.showDone || !element.isDone)
        .map((element) => <li key={element.id}><Message 
            id={element.id} 
            key={element.id} 
            time={element.time} 
            message={element.message} 
            isDone={element.isDone} />
            </li>
        )
    return <>
        Checkbox list
        <div className='inputes'>
            <form className='inputes flexHalf' onSubmit={handleSubmit}>
                <label htmlFor="listItem">List Item:</label>
                <input
                    type="text"
                    id="listItem"
                    name="listItem"
                    placeholder="Add note"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type="submit">Save Item</button>
            </form>
            <div className='button hide flexButton' onClick={() => dispatch(changeShowType())}>
                {state.showDone ? 'Hide done' : 'Show done'}
            </div>
            <div className='button delete flexButton' onClick={() => dispatch(deleteDone())}>
                Delete done
            </div>
        </div>
        <div className='messages'>
            <ul>
                {messagesList}
            </ul>
        </div>
    </>
}