import { Injectable } from '@angular/core';
import { createStore } from 'redux';
import { appReducer } from '../reducers/reducer';
import {CompleteState} from './app_state';

@Injectable()
export class AppStore {
  private store_;
  constructor() {
    this.store_ = createStore(appReducer);
  }

  subscribe(fn) {
    return this.store_.subscribe(fn);
  }

  dispatch(action) {
    return this.store_.dispatch(action);
  }

  getState(): CompleteState {
    return this.store_.getState();
  }
}
