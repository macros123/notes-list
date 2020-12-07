import { createSlice } from '@reduxjs/toolkit';
import { GAME_STATUSES, shuffleArray } from './constants'

/**
 * fill initial state of state tree
 */
const COUNT_OF_CARDS = 36;
const cards = [];
for(let i = 0; i < COUNT_OF_CARDS; i+=2) {
  cards.push({
    isVisible: true,
    isShowing: false,
    id: i,
    value: Math.trunc(i/2),
    pairId: i+1
  });
  cards.push({
    isVisible: true,
    isShowing: false,
    id: i+1,
    value: Math.trunc(i/2),
    pairId: i
  })
}
const initialState = {
  gameStatus: GAME_STATUSES.waiting,
  cards: cards,
  gameStarted: false,
  openedCard: {},
  pairLeft: COUNT_OF_CARDS/2
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    /**
     * open card by id
     * action depends on game status
     * @param id: number
     */
    openCard: (state, action) => {
      switch (state.gameStatus) {
        case GAME_STATUSES.gaming:
          state.cards[action.payload].isShowing = true;
          state.gameStatus = GAME_STATUSES.oneCardOpened;
          state.openedCard = state.cards[action.payload];
          break;
        case GAME_STATUSES.oneCardOpened:
          if (state.cards[action.payload].id === state.openedCard.pairId) {
            state.cards[action.payload].isVisible = false;
            state.cards.forEach((element) => {
              if(element.id === state.openedCard.pairId || element.id === state.openedCard.id)
                element.isVisible = false
            })
            state.pairLeft--;
            if (state.pairLeft === 0) {
              state.gameStatus = GAME_STATUSES.finish;              
            } else {
              state.gameStatus = GAME_STATUSES.gaming;
            }
          } else {
            state.gameStatus = GAME_STATUSES.twoCardOpened;
            state.cards[action.payload].isShowing = true;
          }
          break;
        default:
          break;
      }
    },
    /**
     * close card by id
     * @param id: number
     */
    closeCard: (state, action) => {
      state.cards.find(item => item.id === action.payload).isShowing = false;
      state.openedCard = {};  
      state.gameStatus = GAME_STATUSES.gaming;   
    },
    /**
     * close all cards
     */
    closeAllCards: (state) => {
      state.cards.forEach((element) => {
        element.isShowing = false;
      });
      state.openedCard = {};
      state.gameStatus = GAME_STATUSES.gaming;
    },
    /**
     * game starter function
     */
    gameStart: (state) => {
        state.cards = shuffleArray(cards);
        state.gameStarted = Math.random().toString(36).substr(2, 9); //just unique id for new game
        state.gameStatus = GAME_STATUSES.gaming;
        state.pairLeft = COUNT_OF_CARDS/2;
        state.openedCard = {};
    }
  },
});

export const { openCard, gameStart, closeCard, closeAllCards } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectState = state => state.game;

export default gameSlice.reducer;
