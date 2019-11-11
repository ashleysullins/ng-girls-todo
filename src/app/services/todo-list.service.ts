import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

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

  constructor(private storageService: StorageService) {
    this.todoList =
      storageService.getData(todoListStorageKey) || defaultTodolist;
   }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  addItem(item: TodoItem) {
    this.todoList.push(item);
    this.saveList();
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
    return this.todoList;
  }
}
