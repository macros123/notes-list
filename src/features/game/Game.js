import React from 'react'
import './game.css'
import { useDispatch, useSelector } from 'react-redux';
import {
    openCard,
    gameStart,
    selectState
  } from './gameSlice';
import Card from './Card' 

export default function Game(props) {
    const dispatch = useDispatch();
    const state = useSelector(selectState)
    const cards = state.cards || [];
    console.log(cards);
    const cardList = cards.map((element) => <Card id={element.id} key={element.id} />
    )
    return <><div onClick={() => {
        dispatch(gameStart())
        
    }} >111</div>
    <div>
        {cardList}
    </div>
    </>
}