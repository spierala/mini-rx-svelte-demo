import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { apiBasePath } from '../../../environment';

const apiUrl = apiBasePath + '/todos/';

export class TodosApiService {
    constructor() {}

    getTodos(): Observable<Todo[]> {
        return ajax.get<Todo[]>(apiUrl).pipe(map((res) => res.response));
    }

    createTodo(todo: Todo): Observable<Todo> {
        return ajax.post<Todo>(apiUrl, todo).pipe(
            map((res) => {
                return res.response;
            })
        );
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return ajax.put<Todo>(apiUrl + todo.id, todo).pipe(map((res) => res.response));
    }

    deleteTodo(todo: Todo): Observable<AjaxResponse<void>> {
        return ajax.delete(apiUrl + todo.id);
    }
}
