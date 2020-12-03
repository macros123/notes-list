import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs'

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

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameStatus: null,
    cards: cards,
    gameStarted: null,
    openedCard: {}
  },
  reducers: {
    openCard: (state, action) => {
      if (state.gameStatus === 'gaming') {
        state.cards[action.payload].isShowing = !state.cards[action.payload].isShowing;
        state.gameStatus = state.cards[action.payload].pairId.toString();
      } else {
        if (action.payload === Number(state.gameStatus)) {
          state.cards[action.payload].isVisible = false;
          state.cards[state.gameStatus].isVisible = false;
        } else {

        }
      }
    },
    gameStart: (state) => {
        state.gameStarted = new dayjs().format();
        state.gameStatus = 'gaming';
    }
  },
});

export const { openCard, gameStart } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectState = state => state.game;

export default gameSlice.reducer;
