import { Component, OnInit, Input} from '@angular/core';
import { AppStore } from '../stores/app_store';
import { AppStateActionDispatcher } from '../actions/app_state_actions';
import { BoardActionDispatcher } from '../actions/board_actions';
import { List } from '../stores/app_state';

@Component({
  selector: 'list-container',
  templateUrl: './list_container.component.html',
  styleUrls: ['./list_container.component.scss']
})
export class ListContainerComponent implements OnInit {
  @Input('list') list: List;

  constructor(
    private appStore: AppStore,
    private appStateActionDispatcher: AppStateActionDispatcher,
    private boardActionDispatcher: BoardActionDispatcher) {}

  ngOnInit() {

  }
}
