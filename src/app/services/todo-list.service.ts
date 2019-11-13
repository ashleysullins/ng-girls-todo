import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const todoListStorageKey = 'Todo_List';

const defaultTodolist = [
  {title: 'Steal the mannequin head'},
  {title: 'Watch Netflix'},
];

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  todoList: TodoItem[];
  private todoListSubject: Subject<TodoItem[]> = new Subject<TodoItem[]>();

  constructor(private storageService: StorageService,
              private http: HttpClient) {
    this.todoList =
      storageService.getData(todoListStorageKey) || defaultTodolist;
   }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>('http://localhost:3000/items').subscribe(
      response => this.todoListSubject.next(response)
    );
  }

  addItem(item: TodoItem) {
    console.log(item);
    this.http.post('http://localhost:3000/items', item).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }

  updateItem(item: TodoItem, changes) {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes};
    this.saveList();
  }

  deleteItem(item: TodoItem) {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }

  getTodoList() {
    return this.todoListSubject.asObservable();
  }
}
