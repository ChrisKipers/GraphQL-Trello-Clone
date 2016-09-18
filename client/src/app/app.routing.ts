import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BoardDetailComponent } from './board_detail/board_detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'board/:id', component: BoardDetailComponent}
];

export const routing = RouterModule.forRoot(routes);
