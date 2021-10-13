import { Todo } from '../models/todo';
import { Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { apiBasePath } from '../../../environment';
import { toasterSuccess } from '../../../toaster';
import { handleError } from '../../../utils';

const todoApiUrl = apiBasePath + '/todos/';
const failingTodoApiUrl = apiBasePath + '/todos-method-not-allowed/';
let apiUrl = todoApiUrl;

window.onkeyup = function (e) {
    updateApiUrl(e.altKey);
};
window.onkeydown = function (e) {
    updateApiUrl(e.altKey);
};

function updateApiUrl(altKeyPressed: boolean) {
    apiUrl = altKeyPressed ? failingTodoApiUrl : todoApiUrl;
}

export class TodosApiService {
    constructor() {}

    getTodos(): Observable<Todo[]> {
        return ajax.get<Todo[]>(apiUrl).pipe(
            map((res) => res.response),
            catchError(handleError)
        );
    }

    createTodo(todo: Todo): Observable<Todo> {
        return ajax.post<Todo>(apiUrl, todo).pipe(
            map((res) => {
                return res.response;
            }),
            tap(() => toasterSuccess('Todo created')),
            catchError(handleError)
        );
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return ajax.put<Todo>(apiUrl + todo.id, todo).pipe(
            map((res) => res.response),
            tap(() => toasterSuccess('Todo updated')),
            catchError(handleError)
        );
    }

    deleteTodo(todo: Todo): Observable<AjaxResponse<unknown>> {
        return ajax.delete(apiUrl + todo.id).pipe(
            tap(() => toasterSuccess('Todo deleted')),
            catchError(handleError)
        );
    }
}
