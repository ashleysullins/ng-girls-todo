import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
          <h1 class="app-title"> Welcome! </h1>
          <app-list-manager></app-list-manager>
          `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'todo-list';
}
