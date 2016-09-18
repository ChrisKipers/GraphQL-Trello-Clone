import { Component, OnInit } from '@angular/core';
import { AppStore } from '../stores/app_store';
import { AppStateActionDispatcher } from '../actions/app_state_actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public isAddDialogOpen: boolean;

  constructor(private appStore: AppStore, private appStateActionDispatcher: AppStateActionDispatcher) {}

  ngOnInit() {
    this.isAddDialogOpen = this.appStore.getState().appState.isAddDialogOpen;
    this.appStore.subscribe(() => {
      this.isAddDialogOpen = this.appStore.getState().appState.isAddDialogOpen;
    });
  }

  toggleAddDialog() {
    if (this.isAddDialogOpen) {
      this.appStateActionDispatcher.closeAddDialog();
    } else {
      this.appStateActionDispatcher.openAddDialog();
    }
  }
}
