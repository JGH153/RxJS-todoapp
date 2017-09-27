import { Component, OnInit } from '@angular/core';

import { TodoService } from './../service/todo.service'
import { TodoAppItem } from './../interface/todo-app-item'

@Component({
  selector: 'trxjs-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.scss']
})
export class TodoNewComponent implements OnInit {

    showComponent = false;
    todoItemAddVale:string = "";

    constructor(
        private _todoService: TodoService
    ) { }

    ngOnInit() {
        this._todoService.getStream()
        .map(current => {
            return current.addItemActive

        })
        .subscribe(next => {
            this.showComponent = next;
        });
    }

    onClickAddRandomItem(){
        this._todoService.addItem(this.todoItemAddVale);
        this._todoService.setAddNewItem(false);
        this.todoItemAddVale = "";
    }

}
