import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        private _todoService: TodoService,
        private _http: HttpClient,
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
        //this.mouseTakeUntill();
        //this.combineLatest();
        //this.observableErrors();
        //this.observableAjaxSwitchMap();
        this.observablePollData();


    }

    observablePollData(){

        const myObservable = new Observable(observer => {

            Observable.interval(2000).subscribe(next => {
                this._http.get("https://hembstudios.no/birdid/IDprogram/getQuestionsData.php?JSON=1&sessionID=&numberQuestions=80&numRepeatingSpecies=2&difficulty=1&areaID=0&mediaType=1&competitionGroupID=-1&accessCodeCompetitionGroup=&langID=2&siteID=1").subscribe(value  => {
                    observer.next(value);
                })
            });

        })
        .subscribe(value => {
            console.log(value);
        })

    }

    observableAjaxSwitchMap(){

        Observable.interval(500)
        .switchMap(() => {
            return Observable.empty();
        })
        .subscribe(data => {
            console.log(data);
        })

    }

    observableErrors(){

        const timerObservable = Observable.interval(500);

        timerObservable
        .map(x => {
            if(x === 3){
                throw new Error("I hate 3!");
            }else{
                return x;
            }
        })
        // .catch(error => {
        //     console.log("error! + " + error);
        //     return Observable.interval(500);
        // })
        .retry(1)
        .take(10)
        .subscribe(
            next => console.log("Subsc next: " + next),
            error => console.log("Subsc error: " + error),
            () => console.log("Subsc complete")
        )

    }

    combineLatest(){

        const mouseClickObservable = Observable.fromEvent<MouseEvent>(window, 'click');
        const timerObservable = Observable.interval(1000);

        const combinedObservable = mouseClickObservable.combineLatest(timerObservable, (stream1, stream2) => {
            return stream1.x + " | " + stream2
        })

        combinedObservable.subscribe(next => {
            console.log("Next value: " + next);
        })

    }

    mouseTakeUntill(){

        const mouseClickObservable = Observable.fromEvent(window, 'click');
        const mouseMoveObservable = Observable.fromEvent(window, 'mousemove').takeUntil(mouseClickObservable);

        mouseMoveObservable.subscribe(next => {
            console.log("move")
        })

        mouseClickObservable.subscribe(next => {
            console.log("click")
        })


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
        })
        .share();

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
