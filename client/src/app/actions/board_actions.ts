import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../stores/app_store';
import { ApiService } from '../shared/api.service';
import { AppStateActionDispatcher } from './app_state_actions';

import {
  CREATE_BOARD, CREATE_BOARD_SUCCESS,
  BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS,
  LOAD_BOARD, LOAD_BOARD_SUCCESS,
  MODIFY_BOARD, MODIFY_BOARD_SUCCESS,
  CREATE_LIST_REQUEST, CREATE_LIST_REQUEST_SUCCESS,
  CREATE_TASK_REQUEST, CREATE_TASK_REQUEST_SUCCESS} from './board_action_enum';


import {guid} from './guid';

@Injectable()
export class BoardActionDispatcher {
  constructor(
    private appStore: AppStore,
    private apiService: ApiService,
    private appStateActionDispatcher: AppStateActionDispatcher,
    private router: Router) {}

  loadBoardList() {
    this.appStore.dispatch({type: BOARD_LIST_REQUEST});

    this.apiService.getBoards().then((data) => {
      this.appStore.dispatch({type: BOARD_LIST_SUCCESS, boards: data.boards});
    });
  }

  createBoard(newBoard) {
    this.appStore.dispatch({type: CREATE_BOARD});

    this.apiService.createBoard(newBoard).then((data) => {
      this.appStore.dispatch({type: CREATE_BOARD_SUCCESS, board: data.addBoard});
      this.appStateActionDispatcher.closeAddDialog();
      this.router.navigate(['board', data.addBoard.id]);
    });
  }

  getBoard(boardId) {
    this.appStore.dispatch({type: LOAD_BOARD});
    this.apiService.getBoard(boardId).then((data) => {
      this.appStore.dispatch({type: LOAD_BOARD_SUCCESS, board: data.board});
    });
  }

  modifyBoard(boardId, boardProperties) {
    const requestId = guid();

    const optimisticModifier = (state) => {
      const modifiedBoard = Object.assign({}, state.boardPropertiesById[boardId], boardProperties);
      const boardPropertiesById = Object.assign({}, state.boardPropertiesById, {
        [boardId]: modifiedBoard
      });
      return Object.assign({}, state, {boardPropertiesById});
    };

    this.appStore.dispatch({type: MODIFY_BOARD, requestId, optimisticModifier});
    this.apiService.modifyBoard(boardId, boardProperties).then(data => {
      this.appStore.dispatch({type: MODIFY_BOARD_SUCCESS, requestId, board: data.modifyBoard});
    });
  }

  createList(newList) {
    this.appStore.dispatch({type: CREATE_LIST_REQUEST});
    this.apiService.createList(newList).then(data => {
      this.appStore.dispatch({type: CREATE_LIST_REQUEST_SUCCESS, list: data.addBoardList})
    });
  }

  createTask(newTask) {
    this.appStore.dispatch({type: CREATE_TASK_REQUEST});
    this.apiService.createTask(newTask).then(data => {
      this.appStore.dispatch({type: CREATE_TASK_REQUEST_SUCCESS, task: data.addTask})
    });
  }
}
