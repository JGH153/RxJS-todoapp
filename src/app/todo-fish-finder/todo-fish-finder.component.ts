import { Component, OnInit } from '@angular/core';

import { TodoService } from './../service/todo.service'
import { TodoAppItem } from './../interface/todo-app-item'

@Component({
  selector: 'trxjs-todo-fish-finder',
  templateUrl: './todo-fish-finder.component.html',
  styleUrls: ['./todo-fish-finder.component.scss']
})
export class TodoFishFinderComponent implements OnInit {

  private listHasFish = false;

  constructor(
      private _todoService: TodoService
  ) { }

  ngOnInit() {
      this._todoService.getStream()
      .map(current => {
          return current.todoItems;
      })
      .filter(listOfItems => {
          return listOfItems.find(currentItem => currentItem.value.toLowerCase().includes("fisk")) !== undefined;
      })
      .subscribe(next => {
          this.listHasFish = true;
      });

      this._todoService.getStream()
      .map(current => {
          return current.todoItems;
      })
      .filter(listOfItems => {
          return listOfItems.find(currentItem => currentItem.value.toLowerCase().includes("fisk")) === undefined;
      })
      .subscribe(next => {
          this.listHasFish = false;
      });
  }

}
