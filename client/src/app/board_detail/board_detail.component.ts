import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStore } from '../stores/app_store';
import { BoardActionDispatcher } from '../actions/board_actions';
import { BoardProperties, List, Task } from '../stores/app_state';

@Component({
  selector: 'board-detail',
  templateUrl: './board_detail.component.html',
  styleUrls: ['./board_detail.component.scss']
})
export class BoardDetailComponent implements OnInit {

  private boardId: string;
  private isLoadingBoard: boolean;

  public boardProperties: BoardProperties;
  public lists: List[];
  public tasksByListId: {[key: string]: Task};

  constructor(
    private activeRoute: ActivatedRoute,
    private appStore: AppStore,
    private boardActionDispatcher: BoardActionDispatcher) {

  }

  ngOnInit() {
    this.appStore.subscribe(this.updateComponentState.bind(this));
    this.updateComponentState();
    this.activeRoute.params.subscribe((params: {id: string}) => {
      this.boardId = params.id;
      this.boardActionDispatcher.getBoard(this.boardId);
    });
  }

  updateComponentState() {
    const boardState = this.appStore.getState().board;
    this.isLoadingBoard = boardState.isLoadingBoard;
    if (!this.boardId) {
      return;
    }
    this.boardProperties = boardState.boardPropertiesById[this.boardId];

    const boardRelationships = boardState.boardListRelationshipByBoardId[this.boardId];
    this.lists = boardRelationships ? boardRelationships.map(r => boardState.listsById[r.listId]) : [];

    this.tasksByListId = this.lists.reduce((agg, list) => {
      const taskListRelationships = boardState.taskListRelationshipByListId[list.id] || [];
      agg[list.id] = taskListRelationships.map(r => boardState.taskById[r.taskId]);
      return agg;
    }, {});
  }

  addList(listName) {
    this.boardActionDispatcher.createList({boardId: this.boardId, name: listName});
  }

  ngOnDestroy() {
  }
}
