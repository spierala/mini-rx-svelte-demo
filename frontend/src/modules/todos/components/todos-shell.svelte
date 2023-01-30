<script lang="ts">
    import TodoDetail from '../../todos-shared/components/todo-detail.svelte';
    import TodoFilter from '../../todos-shared/components/todo-filter.svelte';
    import TodoList from '../../todos-shared/components/todo-list.svelte';
    import { todoStore } from '../state/todo.store';
    import { cloneDeep } from 'lodash-es';
    import { map } from 'rxjs/operators';
    import { Todo } from '../../todos-shared/models/todo';
    import { TodoFilter } from '../../todos-shared/models/todoFilter';

    const todosDone$ = todoStore.todosDone$;
    const todosNotDone$ = todoStore.todosNotDone$;
    const selectedTodo$ = todoStore.selectedTodo$.pipe(
        map(cloneDeep) // Prevent todo-detail from mutating the state
    );
    const filter$ = todoStore.filter$;

    function selectTodo(event: CustomEvent<Todo>) {
        todoStore.selectTodo(event.detail);
    }

    function addTodo() {
        todoStore.initNewTodo();
    }

    function createTodo(event: CustomEvent<Todo>) {
        todoStore.create(event.detail);
    }

    function updateTodo(event: CustomEvent<Todo>) {
        todoStore.update(event.detail);
    }

    function deleteTodo(event: CustomEvent<Todo>) {
        todoStore.delete(event.detail);
    }

    function closeTodo() {
        todoStore.clearSelectedTodo();
    }

    function updateFilter(event: CustomEvent<TodoFilter>) {
        todoStore.updateFilter(event.detail)
    }
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-1">
        <span class="navbar-brand">Todos</span>
        <div class="d-flex flex-grow-1 mb-2 justify-content-between mt-2">
            <button class="btn btn-primary btn-sm" on:click={addTodo}>New</button>
            <TodoFilter filter={$filter$} on:updateFilter={updateFilter}/>
        </div>
    </nav>

    <div class="m-3 alert alert-info d-flex align-items-center" role="alert">
        <i class="info-icon bi bi-info-circle-fill"></i>
        <div>
            MiniRx <strong>Feature Store</strong> is used to manage the "Todos" state.
            <br>
            <br>
            The todos are updated optimistically. Press the ALT key while saving or deleting a todo to
            simulate an API error: The optimistic update will be rolled back.
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
