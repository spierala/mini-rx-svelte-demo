<script lang="ts">
    import TodoDetail from '../../todos-shared/components/todo-detail.svelte';
    import TodoFilter from '../../todos-shared/components/todo-filter.svelte';
    import TodoList from '../../todos-shared/components/todo-list.svelte';
    import { todoSimpleStore } from '../state/todo.store';
    import { cloneDeep } from 'lodash-es';
    import { map } from 'rxjs/operators';
    import { Todo } from '../../todos-shared/models/todo';
    import { TodoFilter } from '../../todos-shared/models/todoFilter';

    const todosDone$ = todoSimpleStore.todosDone$;
    const todosNotDone$ = todoSimpleStore.todosNotDone$;
    const selectedTodo$ = todoSimpleStore.selectedTodo$.pipe(
        map(cloneDeep) // Prevent mutating the state
    );
    const filter$ = todoSimpleStore.filter$.pipe(
        map(cloneDeep) // Prevent mutating the state
    );

    function selectTodo(event: CustomEvent<Todo>) {
        todoSimpleStore.selectTodo(event.detail);
    }

    function addTodo() {
        todoSimpleStore.initNewTodo();
    }

    function createTodo(event: CustomEvent<Todo>) {
        todoSimpleStore.create(event.detail);
    }

    function updateTodo(event: CustomEvent<Todo>) {
        todoSimpleStore.update(event.detail);
    }

    function deleteTodo(event: CustomEvent<Todo>) {
        todoSimpleStore.delete(event.detail);
    }

    function closeTodo() {
        todoSimpleStore.clearSelectedTodo();
    }

    function updateFilter(event: CustomEvent<TodoFilter>) {
        todoSimpleStore.updateFilter(event.detail)
    }
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-1">
        <span class="navbar-brand">Todos Simple</span>
        <div class="d-flex flex-grow-1 mb-2 justify-content-between mt-2">
            <button class="btn btn-primary btn-sm" on:click={addTodo}>New</button>
            <TodoFilter filter={$filter$} on:updateFilter={updateFilter}/>
        </div>
    </nav>

    <div class="m-3 alert alert-info d-flex align-items-center" role="alert">
        <i class="info-icon bi bi-info-circle-fill"></i>
        <div>
            MiniRx <strong>Feature Store</strong> is used to manage the "Todos Simple" state.
            Feature Store state becomes part of the <strong>global state</strong> object.
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card h-100">
                    <div class="card-header">
                        <span>Todos</span>
                    </div>
                    <TodoList
                        todos={$todosNotDone$}
                        selectedTodo={$selectedTodo$}
                        on:selectTodo={selectTodo}
                    />
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="card-header">
                        <span>Todos Done</span>
                    </div>
                    <TodoList
                        todos={$todosDone$}
                        selectedTodo={$selectedTodo$}
                        on:selectTodo={selectTodo}
                    />
                </div>
            </div>
            {#if $selectedTodo$}
                <div class="col">
                    <TodoDetail todo={$selectedTodo$}
                                on:create={createTodo}
                                on:update={updateTodo}
                                on:delete={deleteTodo}
                                on:close={closeTodo}
                    />
                </div>
            {/if}
        </div>
    </div>
</div>
