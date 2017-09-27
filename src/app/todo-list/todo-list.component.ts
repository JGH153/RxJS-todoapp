import { Component, OnInit } from '@angular/core';

import { TodoService } from './../service/todo.service'
import { TodoAppItem } from './../interface/todo-app-item'

@Component({
  selector: 'trxjs-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    private todoListLocal:TodoAppItem[] = [];

    constructor(
        private _todoService: TodoService
    ) { }

    ngOnInit() {
        this._todoService.getStream()
        .map(current => {
            return current.todoItems;
        })
        .subscribe(next => {
            this.todoListLocal = next;
        });
    }

    onOpenEditItem(itemId){
        this._todoService.setEditOnItemById(itemId);
    }

    onDeleteItem(itemId){
        this._todoService.deleteItemById(itemId);
    }

    openAddItem(){
        this._todoService.setAddNewItem(true);
    }

}
