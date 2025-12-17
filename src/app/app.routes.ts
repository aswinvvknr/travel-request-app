import { Routes } from '@angular/router';
import { TravelRequest } from './components/travel-request/travel-request';
import { TravelList } from './components/travel-list/travel-list';

export const routes: Routes = [
  { path: '', component: TravelList },
  { path: 'create', component: TravelRequest },
  { path: 'edit/:id', component: TravelRequest },
];
