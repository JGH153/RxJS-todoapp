import { Component, OnInit } from '@angular/core';

import { TodoService } from './../service/todo.service'
import { TodoAppItem } from './../interface/todo-app-item'

@Component({
  selector: 'trxjs-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

    showComponent = false;
    localEditId = null;
    todoItemEditVale = "";

    constructor(
        private _todoService: TodoService
    ) { }

    ngOnInit() {

        this._todoService.getStream()
        .filter(current => {
            return current.editId !== null;
        })
        .map(current => {
            return {
                editId: current.editId,
                editObject: current.todoItems[current.editId]
            }

        })
        .subscribe(next => {
            if(next.editId !== null){
                this.localEditId = next.editId
                this.todoItemEditVale = next.editObject.value
                this.showComponent = true;
            }else{
                this.showComponent = false;
            }

        });

        this._todoService.getStream()
        .filter(current => {
            return current.editId === null;
        })
        .subscribe(next => {
            this.showComponent = false;
        });

    }

    clickSaveItem(){
        if(this.localEditId !== null){
            this._todoService.updateItem(this.localEditId, this.todoItemEditVale)
        }
    }

}
