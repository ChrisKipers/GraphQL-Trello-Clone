import { Injectable } from '@angular/core';
import { AppStore } from '../stores/app_store';

import {OPEN_ADD_DIALOG, CLOSE_ADD_DIALOG} from './app_state_action_enum';

@Injectable()
export class AppStateActionDispatcher {
  constructor(private appStore: AppStore) {}

  openAddDialog() {
    this.appStore.dispatch({type: OPEN_ADD_DIALOG});
  }

  closeAddDialog() {
    this.appStore.dispatch({type: CLOSE_ADD_DIALOG});
  }
}
