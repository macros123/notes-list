import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import messagesSlice from '../features/messages/mesagesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesSlice,
  },
});
