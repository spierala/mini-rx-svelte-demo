import { Todo } from '../models/todo';
import { Filter } from '../models/filter';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
    Action,
    createFeatureSelector,
    createSelector,
    FeatureStore,
    tapResponse,
} from 'mini-rx-store';
import { TodoApiService } from '../services/todo-api.service';
import { v4 as uuid } from 'uuid';

// STATE INTERFACE
interface TodoState {
    todos: Todo[];
    filter: Filter;
    selectedTodo: Todo | undefined;
}

// INITIAL STATE
const initialState: TodoState = {
    todos: [],
    selectedTodo: undefined,
    filter: {
        search: '',
        category: {
            isBusiness: false,
            isPrivate: false,
        },
    },
};

// MEMOIZED SELECTORS
const getTodosFeatureSelector = createFeatureSelector<TodoState>();
const getTodos = createSelector(getTodosFeatureSelector, (state) => state.todos);
const getSelectedTodo = createSelector(getTodosFeatureSelector, (state) => state.selectedTodo);
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

const apiService: TodoApiService = new TodoApiService();

class TodoStore extends FeatureStore<TodoState> {
    // STATE OBSERVABLES
    todosDone$: Observable<Todo[]> = this.select(getTodosDone);
    todosNotDone$: Observable<Todo[]> = this.select(getTodosNotDone);
    filter$: Observable<Filter> = this.select(getFilter);
    selectedTodo$: Observable<Todo | undefined> = this.select(getSelectedTodo);

    constructor() {
        super('todos', initialState);

        this.load();
    }

    // UPDATE STATE
    selectTodo(todo: Todo) {
        this.setState({ selectedTodo: todo }, 'selectTodo');
    }

    initNewTodo() {
        const newTodo = new Todo();
        newTodo.tempId = uuid();
        this.setState({ selectedTodo: newTodo }, 'initNewTodo');
    }

    clearSelectedTodo() {
        this.setState(
            {
                selectedTodo: undefined,
            },
            'clearSelectedTodo'
        );
    }

    updateFilter(filter: Filter) {
        this.setState(
            (state) => ({
                filter: {
                    ...state.filter,
                    ...filter,
                },
            }),
            'updateFilter'
        );
    }

    // API CALLS...
    // ...with effect
    load = this.effect((payload$) => {
        return payload$.pipe(
            mergeMap(() =>
                apiService.getTodos().pipe(
                    tapResponse(
                        (todos) => this.setState({ todos }, 'loadSuccess'),
                        (err) => {
                            console.error(err);
                        }
                    )
                )
            )
        );
    });

    // ... with effect (and optimistic update / undo)
    create = this.effect<Todo>(
        // FYI: we can skip the payload$.pipe when using just one RxJS operator
        mergeMap((todo) => {
            const optimisticUpdate: Action = this.setState((state) => {
                // Create a new Todo object to prevent the Immutable Extension from making the current form model immutable
                // This is only a concern if the create call fails (which would return a new Todo object)
                const newTodo: Todo = { ...todo };
                return {
                    todos: [...state.todos, newTodo],
                };
            }, 'createOptimistic');

            return apiService.createTodo(todo).pipe(
                tapResponse({
                    next: (createdTodo) => {
                        this.setState(
                            (state) => ({
                                todos: state.todos.map((item) =>
                                    item.tempId === todo.tempId ? createdTodo : item
                                ),
                                selectedTodo: createdTodo,
                            }),
                            'createSuccess'
                        );
                    },
                    error: (err) => {
                        console.error(err);
                        this.undo(optimisticUpdate);
                    },
                })
            );
        })
    );

    // ...with subscribe (and optimistic update / undo)
    update(todo: Todo) {
        const optimisticUpdate: Action = this.setState(
            (state) => ({
                todos: updateTodoInList(state.todos, todo),
            }),
            'updateOptimistic'
        );

        apiService.updateTodo(todo).subscribe({
            next: (updatedTodo) => {
                this.setState(
                    (state) => ({
                        todos: updateTodoInList(state.todos, updatedTodo),
                    }),
                    'updateSuccess'
                );
            },
            error: (err) => {
                console.error(err);
                this.undo(optimisticUpdate);
            },
        });
    }

    // ...with subscribe (and optimistic update / undo)
    delete(todo: Todo) {
        const optimisticUpdate: Action = this.setState(
            (state) => ({
                selectedTodo: undefined,
                todos: state.todos.filter((item) => item.id !== todo.id),
            }),
            'deleteOptimistic'
        );

        apiService.deleteTodo(todo).subscribe({
            error: (err) => {
                console.error(err);
                this.undo(optimisticUpdate);
            },
        });
    }
}

function updateTodoInList(todos: Todo[], updatedTodo: Todo): Todo[] {
    return todos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item));
}

export const todoStore = new TodoStore();
