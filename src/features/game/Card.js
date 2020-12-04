import React from 'react'
import './game.css'
import { useDispatch } from 'react-redux';
import {
    openCard
  } from './gameSlice';
  import { HIDDEN_ICONS } from './constants' 

export default function Card(props) {
    const dispatch = useDispatch();
    /**
    * handle click
    */
    const handleClick = () => {
        if (props.element.isVisible) {
            props.click();
            dispatch(openCard(props.numberInRow));
        }; 
    }
    return <>
    <div 
        className={
            `gameCardButton 
            ${!props.element.isVisible && ' invisible'} 
            ${props.element.isShowing && 'gameCardOpened'}`
        }
        onClick={() => handleClick()} >
        {props.element.isShowing && <img src={HIDDEN_ICONS[props.element.value]} alt="Icon" />}
    </div></>
}