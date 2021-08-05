import { Component, ViewChild, ViewContainerRef, ɵrenderComponent as renderComponent, Inject, Injector, ComponentFactoryResolver } from '@angular/core';
import { AuthLibService } from 'auth-lib';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetTodos, Todo } from './ngxs/ngxs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'shell';
  count = 0;
  todos: Observable<Todo[]>;

  constructor(private service: AuthLibService, http: HttpClient, private store: Store) {
    this.store.dispatch(new GetTodos()).subscribe(r => {
      console.log(100, r);
      this.count = r.todos.todos.length;
    });
  }

}

