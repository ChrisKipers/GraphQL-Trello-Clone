import { Injectable } from '@angular/core';
import { AppStore } from '../stores/app_store';
import { ApiService } from '../shared/api.service'
import { AppStateActionDispatcher } from './app_state_actions';

import {CREATE_BOARD, CREATE_BOARD_SUCCESS, LOAD_BOARD_LIST, LOAD_BOARD_LIST_SUCCESS} from './board_action_enum';

@Injectable()
export class BoardActionDispatcher {
  constructor(
    private appStore: AppStore,
    private apiService: ApiService,
    private appStateActionDispatcher: AppStateActionDispatcher) {}

  loadBoardList() {
    this.appStore.dispatch({type: LOAD_BOARD_LIST});

    this.apiService.getBoards().then((data) => {
      this.appStore.dispatch({type: LOAD_BOARD_LIST_SUCCESS, boards: data.boards});
    });
  }

  createBoard(newBoard) {
    this.appStore.dispatch({type: CREATE_BOARD});

    this.apiService.createBoard(newBoard).then((data) => {
      this.appStore.dispatch({type: CREATE_BOARD_SUCCESS, board: data.addBoardMutation});
      this.appStateActionDispatcher.closeAddDialog();
    })
  }
}
