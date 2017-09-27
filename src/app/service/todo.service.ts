import { Injectable } from '@angular/core';
import { TodoAppItem } from './../interface/todo-app-item'
import { TodoAppStream } from './../interface/todo-app-stream'

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TodoService {

    private editObjectId: null | number = null;
    private addItemActive: boolean = false;
    private listOftodos: TodoAppItem[] = [];
    private todoSubject: Subject<any> = new Subject(); //<TodoAppStream | TodoAppItem[]>

    constructor() { }

    private pushToStream(){
        setTimeout(() => {
            this.todoSubject.next({
                editId: this.editObjectId,
                addItemActive: this.addItemActive,
                todoItems: this.listOftodos
            });
        }, 0);
    }

    init(){
        this.addItem("Brø");
        this.addItem("Melk");
    }

    getStream(){
        return this.todoSubject;
    }

    addItem(itemValue:string){
        let newID = this.listOftodos.length ? this.listOftodos[this.listOftodos.length-1].humanId + 1 : 1;
        this.listOftodos.push({
            humanId: newID,
            value: itemValue
        });
        this.pushToStream();
    }

    updateItem(id, value){
        this.listOftodos[id].value = value;
        this.editObjectId = null;
        this.pushToStream();
    }

    setEditOnItemById(itemId){
        this.editObjectId = itemId;
        this.pushToStream();
    }

    setAddNewItem(newValue){
        this.addItemActive = newValue;
        this.pushToStream();
    }

    deleteItemById(itemId){
        this.listOftodos.splice(itemId, 1);
        this.pushToStream();
    }

}
