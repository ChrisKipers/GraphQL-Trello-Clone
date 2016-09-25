import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'add-text-item',
  templateUrl: './add_text_item.component.html',
  styleUrls: ['./add_text_item.component.scss']
})
export class AddTextItemComponent implements OnInit {
  @Input('placeholder') placeholder: string;
  @Output() itemCreated = new EventEmitter();

  public isActive: boolean;

  constructor() {}

  ngOnInit() {

  }

  toggleIsActive() {
    this.isActive = !this.isActive;
  }

  createItem(text) {
    this.itemCreated.emit(text);
    this.isActive = false;
  }
}
