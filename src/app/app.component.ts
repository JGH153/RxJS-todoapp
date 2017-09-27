import { Component, OnInit } from '@angular/core';

import { TodoService } from './service/todo.service'

import 'rxjs/Rx';

@Component({
    selector: 'TRXJS-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'TRXJS';

    constructor(
        private _todoService: TodoService
    ){}

    ngOnInit(){
        this._todoService.init();
        this._todoService.addItem("Kjøtt");
    }

}
