import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {OVERLAY_PROVIDERS} from '@angular2-material/core';
import {MdCardModule} from '@angular2-material/card';
import {MdMenuModule} from '@angular2-material/menu';
import {MdButtonModule} from '@angular2-material/button';
import {MdInputModule} from '@angular2-material/input';
import {MdIconModule, MdIconRegistry} from '@angular2-material/icon';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdListModule} from '@angular2-material/list';
import {MdTooltipModule} from '@angular2-material/tooltip';

import { AppComponent } from './app.component';
import { HomeComponent, FilterBoardByStatus } from './home/home.component';
import { BoardDetailComponent } from './board_detail/board_detail.component';
import { NavComponent } from './nav/nav.component';
import { AddMenuComponent } from './nav/add_menu/add_menu.component';
import { AddBoardComponent } from './nav/add_menu/add_board.component';
import { ApiService } from './shared';
import { routing } from './app.routing';
import { BoardDetailHeaderComponent } from './board_detail/board_detail_header/board_detail_header.component';
import { EditBoardNameComponent } from './board_detail/board_detail_header/edit_board_name.component';
import { AppStateActionDispatcher } from './actions/app_state_actions';
import { BoardActionDispatcher } from './actions/board_actions';
import { AppStore } from './stores/app_store';
import { ListContainerComponent } from './lists/list_container.component';
import { AddTextItemComponent } from './add_text_item/add_text_item.component';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    MdCardModule,
    MdInputModule,
    MdMenuModule,
    MdButtonModule,
    MdIconModule,
    MdToolbarModule,
    MdListModule,
    MdTooltipModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    BoardDetailComponent,
    NavComponent,
    AddMenuComponent,
    AddBoardComponent,
    BoardDetailHeaderComponent,
    EditBoardNameComponent,
    ListContainerComponent,
    AddTextItemComponent,
    FilterBoardByStatus
  ],
  providers: [
    ApiService,
    MdIconRegistry,
    OVERLAY_PROVIDERS,
    AppStore,
    AppStateActionDispatcher,
    BoardActionDispatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }

  hmrOnInit(store) {
    console.log('HMR store', store);
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
