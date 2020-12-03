import React, { useEffect, useState } from 'react'
import './game.css'
import { useDispatch, useSelector } from 'react-redux';
import {
    gameStart,
    selectState,
    closeCard,
    closeAllCards
  } from './gameSlice';
import Card from './Card' 
import { GAME_STATUSES } from './constants'
import {Timer} from './Timer' 

export default function Game(props) {
    const dispatch = useDispatch();
    const state = useSelector(selectState);
    const cards = state.cards || [];
    const cardList = cards.map(
        (element) => <Card element={element} key={element.id}/>
    )

    const [timer, setTimer] = useState();
    const [isGameFinished, setIsGameFinished] = useState(false);

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
            case GAME_STATUSES.finish:
                setIsGameFinished(true);
                break;
            case GAME_STATUSES.gaming:
                setIsGameFinished(false);
                break;
            default:
                break;
        }
    }, [state.gameStatus])
    return <section className="gameContainer">
        <div 
            className="gameStartButton"
            onClick={() => {
                dispatch(gameStart())        
            }} 
        >
            Start game
        </div>
        {state.gameStarted ? <Timer stop={isGameFinished} round={state.gameStarted}/> : <div className="gameTimerSpot" />}
        <div className="gameCardContainer">
            {cardList}
        </div>
    </section>
}