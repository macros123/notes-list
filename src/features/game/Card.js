import React from 'react'
import './game.css'
import { useDispatch, useSelector } from 'react-redux';
import {
    openCard
  } from './gameSlice';

export default function Card(props) {
    const dispatch = useDispatch();

    return <>
    <div 
        className={`Game-Card ${!props.element.isVisible && ' invisible'}`}
        onClick={() => {
            if (props.element.isVisible) dispatch(openCard(props.element.id));        
        }} >
        {props.element.isShowing && props.element.id}
    </div></>
}