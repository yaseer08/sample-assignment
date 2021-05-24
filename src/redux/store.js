import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import ReduxThunk from 'redux-thunk'
import reducer from './reducers/index';

export const store = createStore(reducer, {}, applyMiddleware(ReduxThunk), +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());