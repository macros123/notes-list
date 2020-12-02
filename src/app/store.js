import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import messagesSlice from '../features/messages/mesagesSlice';
import gameSlice from '../features/game/gameSlice';

export default configureStore({
  reducer: {
    game: gameSlice
  },
});
