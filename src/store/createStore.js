import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'VIEW_BLOG_POST':
      return state + 1
    default:
      return state
  }
};

export default initialState => {
  return createStore(counter, initialState, applyMiddleware(thunk));
};
