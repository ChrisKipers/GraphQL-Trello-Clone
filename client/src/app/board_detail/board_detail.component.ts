import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'board',
  templateUrl: './board_detail.component.html',
  styleUrls: ['./board_detail.component.scss']
})
export class BoardDetailComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) {
    // Do stuff
  }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe((params) => {
      console.log(params.id);
    });
  }

}
