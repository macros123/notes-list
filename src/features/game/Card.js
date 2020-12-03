import React from 'react'
import './game.css'
import { useDispatch, useSelector } from 'react-redux';
import {
    openCard,
    gameStart,
    selectState
  } from './gameSlice';

export default function Card(props) {
    const dispatch = useDispatch();

    return <>
    <div 
        className="Game-Card"
        onClick={() => {
            dispatch(openCard(props.id));        
        }} >

    </div></>
}