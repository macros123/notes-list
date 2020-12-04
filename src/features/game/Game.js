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

export default function Game() {
    const dispatch = useDispatch();
    const state = useSelector(selectState);
    const cards = state.cards || [];

    /**
     * handle click only for fast closing wrong two cards
     */
    const handleClickOnCard = () => {
        if(state.gameStatus === GAME_STATUSES.twoCardOpened) {
            clearTimeout(timer);
            dispatch(closeAllCards());
        }
    } 

    /**
     * create cards
     */
    const cardList = cards.map(
        (element, index) => <Card 
            element={element} 
            key={element.id} 
            click={handleClickOnCard}
            numberInRow={index}            
        />
    )

    /**
     * actial state of Game component
     * timer - setTimeout function 
     * isGameFinished
     */
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
        <div className="gameStartButtonContainer">    
            <div 
                className="gameStartButton"
                onClick={() => {
                    dispatch(gameStart())        
                }} 
            >
                Start game
            </div>
        </div>  
        {state.gameStarted ? <Timer stop={isGameFinished} round={state.gameStarted}/> : <div className="gameTimerSpot" />}
        <div className="gameCardContainer">
            {cardList}
        </div>
    </section>
}