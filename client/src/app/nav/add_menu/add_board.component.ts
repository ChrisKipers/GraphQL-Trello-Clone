import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { BoardActionDispatcher } from './../../actions/board_actions';

@Component({
  selector: 'add-board',
  templateUrl: './add_board.component.html',
  styleUrls: ['./add_board.component.scss']
})
export class AddBoardComponent implements OnInit {
  @Output() boardAdded = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private boardActionDispatcher: BoardActionDispatcher) {}

  ngOnInit() {}

  createBoard(boardName) {
    this.boardActionDispatcher.createBoard({name: boardName});
    this.boardAdded.emit();
  }
}
