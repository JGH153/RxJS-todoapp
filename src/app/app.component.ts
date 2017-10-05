import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TodoService } from './service/todo.service'

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncSubject } from 'rxjs/AsyncSubject';
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
        // this.observablePollData();
        // this.observablePollDataError();
        //this.throttleDebounceTime();
        //this.mouseMoveDebounce();
        //this.observableRacing();
        //this.observableSequence();
        //this.replaySubjects();
        //this.asyncSubject();
        //this.creatingObservables();
        //this.sharedObservable();


    }

    sharedObservable(){

        var myObservable =  new Observable(observer => {
    		observer.next(42);
    		setTimeout(() => {
    			observer.next(200);
    		}, 1000);
    	}).share();

    	myObservable.subscribe(next => {
    		console.log("S1:" + next)
    	});

    	myObservable.subscribe(next => {
    		console.log("S2:" + next)
    	});

    }

    creatingObservables(){

        // let myObservable = Observable.of(1, 2, 3);

        // let myObservable = Observable.interval(300);

        const myObservable = new Observable(observer => {
            let counter = 0;
            let interval = setInterval(() => {
                observer.next( counter++ );
            }, 300);
            return () => { clearInterval(interval) }
        });
        myObservable.subscribe(next => {
            console.log(next)
        })


    }

    asyncSubject(){
        let asyncSubject = new AsyncSubject();
        asyncSubject.subscribe(
            next => {console.log(next)},
            error => {console.log("error")},
            () => {console.log("complete")}
        );

        asyncSubject.next("1");
        asyncSubject.next("2");
        asyncSubject.complete();

    }

    replaySubjects(){
        let replaySubject = new ReplaySubject(2); //2 = buffer size

        replaySubject.next("1");
        replaySubject.next("2");
        replaySubject.next("3");

        replaySubject.subscribe(next => {
            console.log(next) //2, 3
        });
    }

    observableSequence(){

        const allObservables = Observable.concat(
            Observable.interval(300).take(3).map(next => "Timer 1"),
            Observable.interval(400).take(3).map(next => "Timer 2"),
            Observable.interval(200).take(3).map(next => "Timer 3"),
        ).subscribe(next => {
            console.log(next)
        })

    }

    observableRacing(){
        const race = Observable.race(
            Observable.interval(1000).map(next => "Timer 1"),
            Observable.interval(700).map(next => "Timer 2"),
            this._http.get("https://hembstudios.no/birdid/IDprogram/getQuestionsData.php?JSON=1&sessionID=&numberQuestions=80&numRepeatingSpecies=2&difficulty=1&areaID=0&mediaType=1&competitionGroupID=-1&accessCodeCompetitionGroup=&langID=2&siteID=1")
        )
        .take(1)
        .subscribe(next => {
            console.log("winner: " + next)
            console.log(next)
        })
    }

    mouseMoveDebounce(){

        Observable.fromEvent(window, 'mousemove')
        .debounceTime(1000)
        .subscribe(next => {
            console.log(next)
        });

    }

    throttleDebounceTime(){

        const myObservable = new Observable(observer => {
            Observable.interval(250).subscribe(next => {
                if(Math.random() > 0.3){
                    observer.next(next);
                }
            });
        });

        myObservable
        //.throttleTime(600)
        //.debounceTime(600)
        .subscribe(next => {
            console.log("next " + next)
        })

    }

    observablePollDataError(){

        const myObservable = new Observable(observer => {
            Observable.interval(2000).subscribe(next => {
                this._http.get("https://hembstudios.no/birdid/IDprogram/getQuestionsData.php?JSON=1&sessionID=&numberQuestions=80&numRepeatingSpecies=2&difficulty=1&areaID=0&mediaType=1&competitionGroupID=-1&accessCodeCompetitionGroup=&langID=2&siteID=1").subscribe(value  => {
                    observer.next(value);
                })
            });
        });

        myObservable
        .map(next => {
            throw new Error("This is an error!");
        })
        .catch(error => {
            console.log("error! + " + error);
            return myObservable;
        })
        .take(3)
        .subscribe(
            next => console.log(next),
            error => console.log("Subsc error: " + error),
            () => console.log("Subsc complete")
        )

    }

    observablePollData(){

        const myObservable = new Observable(observer => {
            Observable.interval(2000).subscribe(next => {
                this._http.get("https://hembstudios.no/birdid/IDprogram/getQuestionsData.php?JSON=1&sessionID=&numberQuestions=80&numRepeatingSpecies=2&difficulty=1&areaID=0&mediaType=1&competitionGroupID=-1&accessCodeCompetitionGroup=&langID=2&siteID=1").subscribe(value  => {
                    observer.next(value);
                })
            });
        });

        myObservable
        .subscribe(value => {
            console.log(value);
        })

    }

    observableAjaxSwitchMap(){

        Observable.interval(5000)
        .switchMap(() => {
            return this._http.get("https://hembstudios.no/birdid/IDprogram/getQuestionsData.php?JSON=1&sessionID=&numberQuestions=80&numRepeatingSpecies=2&difficulty=1&areaID=0&mediaType=1&competitionGroupID=-1&accessCodeCompetitionGroup=&langID=2&siteID=1")
                .map(next => {
                    if(Math.random() <  0.3){
                        throw new Error("This is an error!")
                    }else{
                        return next;
                    }
                })
                .catch(error => Observable.empty())
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
