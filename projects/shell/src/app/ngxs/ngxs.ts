import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
////////////////////////////
export interface Todo {
    id: number;
    title: string;
}
////////////////////////////
export class GetTodos {
    static readonly type = '[Todo] Get';
}
////////////////////////////
@Injectable({ providedIn: 'root' })
export class TodoService {
    constructor(private http: HttpClient) { }
    fetchTodos() {
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
    }
}
////////////////////////////
export class TodoStateModel {
    todos: Todo[];
    selectedTodo: Todo;
}

////////////////////////////
@State<TodoStateModel>({
    name: 'todos',
    defaults: {
        todos: [],
        selectedTodo: null,
    }
})
@Injectable()
////////////////////////////
export class TodoState {
    constructor(private todoService: TodoService) {
    }

    @Selector() static getTodoList(state: TodoStateModel) { return state.todos; }

    @Selector() static getSelectedTodo(state: TodoStateModel) { return state.selectedTodo; }

    @Action(GetTodos)
    getTodos({ getState, setState }: StateContext<TodoStateModel>) {
        return this.todoService.fetchTodos().pipe(tap((result) => {
            result = result.filter(r => +r.id <= 5)
            const state = getState();
            setState({ ...state, todos: result, });
        }));
    }
    ////////////////////////////

}

