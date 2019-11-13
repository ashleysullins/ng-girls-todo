import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { TodoItem } from '../interfaces/todo-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-manager',
  template: `
  <div class="todo-app">
    <app-input-button-unit (submit)=addItem($event)></app-input-button-unit>

    <ul *ngIf="todoList | async as todoItems">
      <li *ngFor="let todoItem of todoItems">
        <app-todo-item [item]="todoItem"
                       (remove)="removeItem($event)"
                       (update)="updateItem($event.item, $event.changes)">
        </app-todo-item>
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./list-manager.component.less']
})
export class ListManagerComponent implements OnInit {
  todoList: Observable<TodoItem[]>;

  constructor(private todoListService: TodoListService) {
    todoListService.getTodoList();
   }

  ngOnInit() {
     this.todoList = this.todoListService.getTodoList();
  }

  addItem(item: TodoItem) {
    this.todoListService.addItem(item);
  }

  removeItem(item) {
    this.todoListService.deleteItem(item);
  }

  updateItem(item, changes) {
    this.todoListService.updateItem(item, changes);
  }

}
