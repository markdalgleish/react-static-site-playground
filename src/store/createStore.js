import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
};

export default initialState => {
  return createStore(counter, initialState, applyMiddleware(thunk));
};
