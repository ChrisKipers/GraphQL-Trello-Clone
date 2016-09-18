import { Component, OnInit } from '@angular/core';
import { ApiService } from './../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLoading: boolean;
  public boards: Array<Object>;

  constructor(private api: ApiService) {
    this.isLoading = true;
    api.getBoards().subscribe(result => {
      this.boards = result.boards;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
