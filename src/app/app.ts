import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TravelRequest } from './components/travel-request/travel-request';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('travel-request-app');
}
