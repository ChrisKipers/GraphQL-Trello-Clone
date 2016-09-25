import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-menu',
  templateUrl: './add_menu.component.html',
  styleUrls: ['./add_menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  @Output() itemAdded = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
