import { Component, Input, ViewChild} from '@angular/core';
import { MdMenuTrigger } from '@angular2-material/menu';

@Component({
  selector: 'board-detail-header',
  templateUrl: './board_detail_header.component.html',
  styleUrls: ['./board_detail_header.component.scss']
})
export class BoardDetailHeaderComponent {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  @Input('boardProperties') boardProperties: Object;

  constructor() {
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  closeMenu() {
    this.trigger.closeMenu();
  }
}
