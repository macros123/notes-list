import React, { useEffect, useState } from 'react'
import './game.css'
import { useDispatch, useSelector } from 'react-redux';
import {
    openCard,
    gameStart,
    selectState,
    closeCard,
    closeAllCards
  } from './gameSlice';
import Card from './Card' 
import { GAME_STATUSES } from './constants'

export default function Game(props) {
    const dispatch = useDispatch();
    const state = useSelector(selectState)
    const cards = state.cards || [];
    const cardList = cards.map(
        (element) => <Card element={element} key={element.id}/>
    )

    const [timer, setTimer] = useState();
    useEffect(() => {
        clearTimeout(timer);
        switch (state.gameStatus) {
            case GAME_STATUSES.oneCardOpened:
                setTimer(setTimeout(() => {
                    dispatch(closeCard(state.openedCard.id));
                }, 2000));
                break;
            case GAME_STATUSES.twoCardOpened:
                setTimer(setTimeout(() => {
                    dispatch(closeAllCards());
                }, 2000));
                break;
        }
    }, [state.gameStatus])
    return <><div onClick={() => {
        dispatch(gameStart())
        
    }} >111</div>
    <div className="cardContainer">
        {cardList}
    </div>
    </>
}