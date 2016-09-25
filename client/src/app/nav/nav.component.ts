import { Component, ViewChild } from '@angular/core';
import { MdMenuTrigger } from '@angular2-material/menu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  constructor() {}

  closeMenu() {
    this.trigger.closeMenu();
  }

  preventDefault(event) {
    event.stopPropagation();
  }
}
