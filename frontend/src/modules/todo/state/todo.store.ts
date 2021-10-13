import { Todo } from '../models/todo';
import { Filter } from '../models/filter';
import { EMPTY, Observable } from 'rxjs';
import { catchError, debounceTime, mergeMap, tap } from 'rxjs/operators';
import { Action, createFeatureSelector, createSelector, FeatureStore } from 'mini-rx-store';
import { TodosApiService } from '../services/todos-api.service';

// STATE INTERFACE
interface TodoState {
    todos: Todo[];
    selectedTodoId: number;
    filter: Filter;
    newTodo: Todo; // Used when creating a new Todo
}

// INITIAL STATE
const initialState: TodoState = {
    todos: [],
    selectedTodoId: undefined,
    filter: {
        search: '',
        category: {
            isBusiness: false,
            isPrivate: false,
        },
    },
    newTodo: undefined,
};

// MEMOIZED SELECTORS
const getTodosFeatureSelector = createFeatureSelector<TodoState>();
const getTodos = createSelector(getTodosFeatureSelector, (state) => state.todos);
const getFilter = createSelector(getTodosFeatureSelector, (state) => state.filter);
const getTodosFiltered = createSelector(getTodos, getFilter, (todos, filter) => {
    return todos.filter((item) => {
        return (
            item.title.toUpperCase().indexOf(filter.search.toUpperCase()) > -1 &&
            (filter.category.isBusiness ? item.isBusiness : true) &&
            (filter.category.isPrivate ? item.isPrivate : true)
        );
    });
});
const getTodosDone = createSelector(getTodosFiltered, (todos) =>
    todos.filter((todo) => todo.isDone)
);
const getTodosNotDone = createSelector(getTodosFiltered, (todos) =>
    todos.filter((todo) => !todo.isDone)
);
const getNewTodo = createSelector(getTodosFeatureSelector, (state) => state.newTodo);
const getSelectedTodoId = createSelector(getTodosFeatureSelector, (state) => state.selectedTodoId);
const getSelectedTodo = createSelector(
    getTodos,
    getSelectedTodoId,
    getNewTodo,
    (todos, selectedTodoId, newTodo) => {
        if (newTodo) {
            return newTodo;
        }
        return todos.find((item) => item.id === selectedTodoId);
    }
);

const apiService: TodosApiService = new TodosApiService();

class TodoStore extends FeatureStore<TodoState> {
    // STATE OBSERVABLES
    todosDone$: Observable<Todo[]> = this.select(getTodosDone);
    todosNotDone$: Observable<Todo[]> = this.select(getTodosNotDone);
    filter$: Observable<Filter> = this.select(getFilter);
    selectedTodo$: Observable<Todo> = this.select(getSelectedTodo);

    constructor() {
        super('todos', initialState);
        this.load();
    }

    // UPDATE STATE
    selectTodo(todo: Todo) {
        this.setState({ selectedTodoId: todo.id }, 'selectTodo');
    }

    initNewTodo() {
        this.setState({ newTodo: new Todo(), selectedTodoId: undefined }, 'initNewTodo');
    }

    clearSelectedTodo() {
        this.setState(
            {
                selectedTodoId: undefined,
                newTodo: undefined,
            },
            'clearSelectedTodo'
        );
    }

    toggleIsPrivate() {
        this.setState(
            (state) => ({
                filter: {
                    ...state.filter,
                    category: {
                        ...state.filter.category,
                        isPrivate: !state.filter.category.isPrivate,
                    },
                },
            }),
            'toggleIsPrivate'
        );
    }

    toggleIsBusiness() {
        this.setState(
            (state) => ({
                filter: {
                    ...state.filter,
                    category: {
                        ...state.filter.category,
                        isBusiness: !state.filter.category.isBusiness,
                    },
                },
            }),
            'toggleIsBusiness'
        );
    }

    search = this.effect<string>((payload$) =>
        payload$.pipe(
            debounceTime(350),
            tap((search) =>
                this.setState(
                    (state) => ({
                        filter: {
                            ...state.filter,
                            search: search,
                        },
                    }),
                    'updateSearch'
                )
            )
        )
    );

    // API CALLS...
    // ...with effect
    load = this.effect<void>((payload$) => {
        return payload$.pipe(
            mergeMap(() =>
                apiService.getTodos().pipe(
                    tap((todos) => this.setState({ todos }, 'loadSuccess')),
                    catchError(() => {
                        return EMPTY;
                    })
                )
            )
        );
    });

    // ... with effect and optimistic update / undo
    create = this.effect<Todo>(
        // FYI: we can skip the $payload pipe when using just one RxJS operator
        mergeMap((todo) => {
            const optimisticUpdate: Action = this.setState(
                {
                    todos: [...this.state.todos, todo],
                },
                'createOptimistic'
            );

            return apiService.createTodo(todo).pipe(
                tap((newTodo) => {
                    this.setState(
                        (state) => ({
                            todos: state.todos.map((item) => (item === todo ? newTodo : item)),
                            newTodo: undefined,
                        }),
                        'createSuccess'
                    );
                }),
                catchError(() => {
                    this.undo(optimisticUpdate);
                    return EMPTY;
                })
            );
        })
    );

    // ...with subscribe
    update(todo: Todo) {
        const optimisticUpdate: Action = this.setState(
            (state) => ({
                todos: updateTodoInList(state.todos, todo),
            }),
            'updateOptimistic'
        );

        apiService
            .updateTodo(todo)
            .pipe(
                tap((updatedTodo) => {
                    this.setState(
                        (state) => ({
                            todos: updateTodoInList(state.todos, updatedTodo),
                        }),
                        'updateSuccess'
                    );
                }),
                catchError(() => {
                    this.undo(optimisticUpdate);
                    return EMPTY;
                })
            )
            .subscribe();
    }

    // ...with subscribe
    delete(todo: Todo) {
        const optimisticUpdate: Action = this.setState(
            (state) => ({
                todos: this.state.todos.filter((item) => item.id !== todo.id),
            }),
            'deleteOptimistic'
        );

        apiService
            .deleteTodo(todo)
            .pipe(
                tap(() => {
                    this.setState(
                        {
                            selectedTodoId: undefined,
                        },
                        'deleteSuccess'
                    );
                }),
                catchError(() => {
                    this.undo(optimisticUpdate);
                    return EMPTY;
                })
            )
            .subscribe();
    }
}

function updateTodoInList(todos: Todo[], updatedTodo: Todo): Todo[] {
    return todos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item));
}

export const todoStore = new TodoStore();
