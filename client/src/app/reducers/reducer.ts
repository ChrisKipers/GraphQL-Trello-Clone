import { combineReducers } from 'redux'

import {appState} from './app_state_reducers';

export const appReducer = combineReducers({
  appState
});

