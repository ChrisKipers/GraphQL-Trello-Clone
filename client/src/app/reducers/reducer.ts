import { combineReducers } from 'redux';

import {appState} from './app_state_reducers';
import {board} from './board_reducers';

export const appReducer = combineReducers({
  appState,
  board
});

