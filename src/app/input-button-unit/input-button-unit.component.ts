import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
    <label for="ccnumber">Credit Card Number</label>
    <input class="todo-input"
           type="text"
           id="ccnumber"
           name="creditcard"
           autocomplete="cc-name"
           #inputElementRef
           [value]="title"
           (keyup.enter)="submitValue($event.target.value)">

    <button class="btn"
            (click)="submitValue(inputElementRef.value)">
    Save
    </button>
  `,
  styleUrls: ['./input-button-unit.component.less']
})
export class InputButtonUnitComponent implements OnInit {
  @Output() submit: EventEmitter<string> = new EventEmitter();
  title = 'Hello World';

  constructor() {
  }

  ngOnInit() {
  }

  submitValue(newTitle: string) {
    this.submit.emit(newTitle);
  }

}
