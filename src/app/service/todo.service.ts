import { Injectable } from '@angular/core';
import { TodoAppItem } from './../interface/todo-app-item'
import { TodoAppStream } from './../interface/todo-app-stream'

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TodoService {

    private editObjectId: null | number = null;
    private addItemActive: boolean = false;
    private listOftodos: TodoAppItem[] = [];
    private todoSubject: Subject<any> = new Subject(); //<TodoAppStream | TodoAppItem[]>
    private usernameSubject: BehaviorSubject<string> = new BehaviorSubject("Guest"); //<TodoAppStream | TodoAppItem[]>
    private openItemSubject: BehaviorSubject<TodoAppItem | null> = new BehaviorSubject(null);

    constructor() { }

    private pushToStream(todoListChanged){
        setTimeout(() => {
            this.todoSubject.next({
                editId: this.editObjectId,
                addItemActive: this.addItemActive,
                todoListChanged: todoListChanged,
                todoItems: this.listOftodos
            });
        }, 0);
    }

    init(){
        this.addItem("Brø");
        this.addItem("Melk");
        this.usernameSubject.next("Per")
    }

    getStream(){
        return this.todoSubject;
    }

    getUsernameStream(){
        return this.usernameSubject;
    }

    addItem(itemValue:string){
        let newID = this.listOftodos.length ? this.listOftodos[this.listOftodos.length-1].humanId + 1 : 1;
        this.listOftodos.push({
            humanId: newID,
            value: itemValue
        });
        this.pushToStream(true);
    }

    updateItem(id, value){
        this.listOftodos[id].value = value;
        this.editObjectId = null;
        this.pushToStream(true);
    }

    setEditOnItemById(itemId){
        this.editObjectId = itemId;
        this.pushToStream(false);
    }

    setAddNewItem(newValue){
        this.addItemActive = newValue;
        this.pushToStream(false);
    }

    deleteItemById(itemId){
        this.listOftodos.splice(itemId, 1);
        this.pushToStream(true);
    }

    setOpenItem(itemId){
        console.log("yoo")
    }

}
