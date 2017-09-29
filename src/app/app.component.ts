import { Component, OnInit } from '@angular/core';

import { TodoService } from './service/todo.service'

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

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

        this._todoService.getUsernameStream().subscribe(next => {
            //console.log(next);
        });

        this._todoService.init();
        this._todoService.addItem("Kjøtt");

        setTimeout(() => {
            this._todoService.getUsernameStream().subscribe(next => {
                //console.log(next);
            });
        }, 0);




        //this.randomCode();


    }

    randomCode(){

        const myObservable = new Observable(observer => {
            let i = 0;
            const interval = setInterval(() => {
                i ++;
                observer.next(i);
                console.log("next")
            }, 400)

            return () => {
                console.log("ub sub")
                clearInterval(interval)
            }
        }).share();

        let subscription = myObservable.take(5).subscribe(
            next => console.log("observer AAA: " + next)
        );
        //
        setTimeout(() => {
            console.log("Timeout done");

            let subscription2 = myObservable.take(2).subscribe(
                next => console.log("observer B-B: " + next)
            );

            subscription.unsubscribe();

        }, 1000)

    }

}
