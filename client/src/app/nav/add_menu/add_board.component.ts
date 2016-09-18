import { Component, OnInit } from '@angular/core';
import { BoardActionDispatcher } from './../../actions/board_actions';

@Component({
  selector: 'add-board',
  templateUrl: './add_board.component.html',
  styleUrls: ['./add_board.component.scss']
})
export class AddBoardComponent implements OnInit {
  constructor(private boardActionDispatcher: BoardActionDispatcher) {}

  ngOnInit() {}

  createBoard(boardName) {
    this.boardActionDispatcher.createBoard({name: boardName});
  }
}
