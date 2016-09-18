import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared';

@Component({
  selector: 'add-board',
  templateUrl: './add_board.component.html',
  styleUrls: ['./add_board.component.scss']
})
export class AddBoardComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit() {}

  createBoard(boardName) {
    this.api.createBoard({name: boardName}).subscribe(console.log);
  }
}
