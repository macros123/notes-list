import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { GAME_STATUSES } from './constants'

const COUNT_OF_CARDS = 16;
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
    openCard: (state, action) => {
      switch (state.gameStatus) {
        case GAME_STATUSES.gaming:
          state.cards[action.payload].isShowing = true;
          state.gameStatus = GAME_STATUSES.oneCardOpened;
          state.openedCard = state.cards[action.payload];
          break;
        case GAME_STATUSES.oneCardOpened:
          if (action.payload === state.openedCard.pairId) {
            state.cards[action.payload].isVisible = false;
            state.cards[state.openedCard.id].isVisible = false;
            state.cards[state.openedCard.id].isShowing = false;
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
        case GAME_STATUSES.waiting:
          state.cards[action.payload].isShowing = true;
          break;
        default:
          break;
      }
    },
    closeCard: (state, action) => {
      state.cards[action.payload].isShowing = false;
      state.openedCard = {};  
      state.gameStatus = GAME_STATUSES.gaming;   
    },
    closeAllCards: (state) => {
      state.cards.forEach((element) => {
        element.isShowing = false;
      });
      state.openedCard = {};
      state.gameStatus = GAME_STATUSES.gaming;
    },
    gameStart: (state) => {
        state.cards = cards;
        state.gameStarted = dayjs().format();
        state.gameStatus = GAME_STATUSES.gaming;
        state.pairLeft = COUNT_OF_CARDS/2;
        state.openedCard = {};
    }
  },
});

export const { openCard, gameStart, closeCard, closeAllCards } = gameSlice.actions;


export const openCardAsync = amount => dispatch => {
  dispatch(openCard(amount.id));
  if (amount) {
    setTimeout(() => {
      dispatch(closeAllCards());
    }, 2000);
  } else {
    setTimeout(() => {
      dispatch(closeCard(amount.id));
    }, 2000);
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectState = state => state.game;

export default gameSlice.reducer;
