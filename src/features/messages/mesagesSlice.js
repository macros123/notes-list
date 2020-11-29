import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    list: [
        {
            id: 0,
            time: dayjs().format(),
            message: 'test string',
            isDone: false
        },
        {
            id: 1,
            time: dayjs().format(),
            message: 'test done string',
            isDone: true
        }
    ],
    showDone: true
  },
  reducers: {
    addMessage: (state, action) => {
        const payload = {
          id: state.list[state.list.length - 1].id + 1,
          time: dayjs().format(),
          message: action.payload,
          isDone: false
        }
        state.list.push(payload);
    },
    changeShowType: state => {
        state.showDone = !state.showDone;
    },
    changeDoneStatus: (state, action) => {
        state.list[action.payload].isDone = !state.list[action.payload].isDone;
    },
    deleteDone: state => {
        return {
          list: state.list.filter(element => !element.isDone),
          showDone: state.showDone
        }
    }
  },
});

export const { addMessage, changeShowType, changeDoneStatus, deleteDone } = messagesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    //dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectState = state => state.messages;

export default messagesSlice.reducer;
