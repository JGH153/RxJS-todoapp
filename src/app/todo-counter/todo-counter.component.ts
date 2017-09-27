import { Component, OnInit } from '@angular/core';

import { TodoService } from './../service/todo.service'
import { TodoAppItem } from './../interface/todo-app-item'

@Component({
  selector: 'trxjs-todo-counter',
  templateUrl: './todo-counter.component.html',
  styleUrls: ['./todo-counter.component.scss']
})
export class TodoCounterComponent implements OnInit {

    private numElements:number = 0;

    constructor(
        private _todoService: TodoService
    ) { }

    ngOnInit() {
        this._todoService.getStream()
        .map(current => {
            return current.todoItems;
        })
        .subscribe(next => {
            this.numElements = next.length;
        });
    }

}
