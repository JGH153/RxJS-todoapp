import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TodoService } from './service/todo.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoNewComponent } from './todo-new/todo-new.component';
import { TodoCounterComponent } from './todo-counter/todo-counter.component';
import { TodoFishFinderComponent } from './todo-fish-finder/todo-fish-finder.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoEditComponent,
        TodoNewComponent,
        TodoCounterComponent,
        TodoFishFinderComponent,
        TodoItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        TodoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
