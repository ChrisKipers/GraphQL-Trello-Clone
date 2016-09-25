import { Component, Input, ViewChild} from '@angular/core';
import { MdMenuTrigger } from '@angular2-material/menu';
import { BoardActionDispatcher } from '../../actions/board_actions';
import { BoardProperties } from '../../stores/app_state';

@Component({
  selector: 'board-detail-header',
  templateUrl: './board_detail_header.component.html',
  styleUrls: ['./board_detail_header.component.scss']
})
export class BoardDetailHeaderComponent {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  @Input('boardProperties') boardProperties: BoardProperties;

  constructor(private boardActionDispatcher: BoardActionDispatcher) {
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  closeMenu() {
    this.trigger.closeMenu();
  }

  toggleArchive() {
    this.boardActionDispatcher
      .modifyBoard(this.boardProperties.id, {isArchived: !this.boardProperties.isArchived});
  }
}
