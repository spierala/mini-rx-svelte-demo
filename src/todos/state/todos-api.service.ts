import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const apiUrl = 'api/todos/';

export class TodosApiService {
    constructor() {}

    getTodos(): Observable<Todo[]> {
        return ajax.get(apiUrl).pipe(map(res => res.response));
    }

    createTodo(todo: Todo): Observable<Todo> {
        return ajax.post(apiUrl, todo).pipe(
            map((res) => {
                return res.response;
            })
        );
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return ajax.put(apiUrl + todo.id, todo).pipe(map(res => res.response));
    }

    deleteTodo(todo: Todo): Observable<AjaxResponse> {
        return ajax.delete(apiUrl + todo.id);
    }
}
