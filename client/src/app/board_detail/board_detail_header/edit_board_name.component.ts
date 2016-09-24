import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStore } from '../../stores/app_store';
import { BoardActionDispatcher } from '../../actions/board_actions';

@Component({
  selector: 'edit-board-name',
  templateUrl: './edit_board_name.component.html',
  styleUrls: ['./edit_board_name.component.scss']
})
export class EditBoardNameComponent implements OnInit {

  @Input('boardName') boardName: String;
  @Input('boardId') boardId: String;

  public isEditing: boolean;

  constructor(private boardActionDispatcher: BoardActionDispatcher) {
  }

  ngOnInit() {
    this.isEditing = false;
  }

  toggleIsEditing() {
    this.isEditing = !this.isEditing;
  }

  editBoardName(newBoardName) {
    console.log(newBoardName);
    this.isEditing = false;
    this.boardActionDispatcher.modifyBoard(this.boardId, {name: newBoardName});
  }

  ngOnDestroy() {
  }
}
