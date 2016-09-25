import { Component, OnInit, Input} from '@angular/core';
import { AppStore } from '../stores/app_store';
import { AppStateActionDispatcher } from '../actions/app_state_actions';
import { BoardActionDispatcher } from '../actions/board_actions';

@Component({
  selector: 'add-list',
  templateUrl: './add_list.component.html',
  styleUrls: ['./add_list.component.scss']
})
export class AddListComponent implements OnInit {
  @Input('boardId') boardId: string;

  public isActive: boolean;

  constructor(
    private appStore: AppStore,
    private appStateActionDispatcher: AppStateActionDispatcher,
    private boardActionDispatcher: BoardActionDispatcher) {}

  ngOnInit() {

  }

  toggleIsActive() {
    this.isActive = !this.isActive;
  }

  createNewList(listName) {
    this.boardActionDispatcher.createList({boardId: this.boardId, name: listName});
    this.isActive = false;
  }
}
