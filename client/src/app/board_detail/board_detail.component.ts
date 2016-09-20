import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStore } from '../stores/app_store';
import { BoardActionDispatcher } from '../actions/board_actions';

@Component({
  selector: 'board',
  templateUrl: './board_detail.component.html',
  styleUrls: ['./board_detail.component.scss']
})
export class BoardDetailComponent implements OnInit {

  private boardId: String;
  private isLoadingBoard: Boolean;

  public boardProperties;

  constructor(
    private activeRoute: ActivatedRoute,
    private appStore: AppStore,
    private boardActionDispatcher: BoardActionDispatcher) {

  }

  ngOnInit() {
    this.appStore.subscribe(this.updateComponentState.bind(this));
    this.updateComponentState();
    this.activeRoute.params.subscribe(params => {
      this.boardId = params.id;
      this.boardActionDispatcher.getBoard(this.boardId);
    })
  }

  updateComponentState() {
    const boardState = this.appStore.getState().board;
    this.isLoadingBoard = boardState.isLoadingBoard;
    if (!this.boardId) {
      return;
    }
    this.boardProperties = boardState.boardPropertiesById[this.boardId];
  }

  ngOnDestroy() {
  }
}
