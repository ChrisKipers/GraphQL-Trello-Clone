import { Component, OnInit , Injectable, Pipe, PipeTransform} from '@angular/core';
import { Router } from '@angular/router';
import { BoardActionDispatcher } from '../actions/board_actions';
import { AppStore } from '../stores/app_store';
import { BoardProperties } from '../stores/app_state';

@Pipe({name: 'filterBoardByStatus'})
export class FilterBoardByStatus implements PipeTransform {
  transform(items: BoardProperties[], isArchived: boolean): BoardProperties[] {
    return items.filter(i => i.isArchived == isArchived);
  }
}

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public isLoading: boolean;
  public boards: BoardProperties[];

  constructor(
    private appStore: AppStore,
    private boardActionDispatcher: BoardActionDispatcher,
    private router: Router) {
  }

  ngOnInit() {
    this.appStore.subscribe(this.updateState.bind(this));
    this.boardActionDispatcher.loadBoardList();
  }

  updateState() {
    this.boards = this.appStore.getState().board.boardList;
    this.isLoading = this.appStore.getState().board.isLoadingBoardList;
  }

  goToBoard(board) {
    this.router.navigate(['board', board.id]);
  }
}
