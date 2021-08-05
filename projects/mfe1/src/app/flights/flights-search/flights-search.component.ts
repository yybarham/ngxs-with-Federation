import { HttpClient } from '@angular/common/http';
import {Component, ViewChild, ViewContainerRef, Inject, Injector, ComponentFactoryResolver, OnInit} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTodos, Todo } from '../../ngxs/ngxs';


@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html'
})
export class FlightsSearchComponent {
  todos: Observable<Todo[]>;
  count = 0;
  constructor( http: HttpClient, private store: Store) {
    let todo = this.store.dispatch(new GetTodos());
    setTimeout(() => {
      todo.subscribe(r => {
        this.count = r.todos.todos.length;
      });
    }, 200);
  }
}
