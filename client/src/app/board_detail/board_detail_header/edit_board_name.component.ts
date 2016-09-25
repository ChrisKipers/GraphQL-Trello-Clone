import { Component, Input, Output, EventEmitter} from '@angular/core';
import { BoardActionDispatcher } from '../../actions/board_actions';

@Component({
  selector: 'edit-board-name',
  templateUrl: './edit_board_name.component.html',
  styleUrls: ['./edit_board_name.component.scss']
})
export class EditBoardNameComponent {
  @Output() rename = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @Input('boardName') boardName: String;
  @Input('boardId') boardId: String;


  constructor(private boardActionDispatcher: BoardActionDispatcher) {
  }


  editBoardName(newBoardName) {
    this.boardActionDispatcher.modifyBoard(this.boardId, {name: newBoardName});
    this.rename.emit();
  }
}
