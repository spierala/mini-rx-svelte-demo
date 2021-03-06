<script lang="ts">
    import TodoDetail from './todo-detail.svelte';
    import TodoFilter from './todo-filter.svelte';
    import TodoList from './todo-list.svelte';
    import { todoStore } from '../state/todo.store';
    import clonedeep from 'lodash.clonedeep';
    import { map } from 'rxjs/operators';

    const todosDone$ = todoStore.todosDone$;
    const todosNotDone$ = todoStore.todosNotDone$;
    const selectedTodo$ = todoStore.selectedTodo$.pipe(
        map(clonedeep) // Prevent mutating the state
    );
    const filter$ = todoStore.filter$.pipe(
        map(clonedeep) // Prevent mutating the state
    );

    function selectTodo(event) {
        todoStore.selectTodo(event.detail.todo);
    }

    function addTodo() {
        todoStore.initNewTodo();
    }
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-1">
        <span class="navbar-brand">Todos</span>
        <div class="d-flex flex-grow-1 mb-2 justify-content-between mt-2">
            <button class="btn btn-primary btn-sm" on:click={addTodo}>New</button>
            <TodoFilter filter={$filter$} />
        </div>
    </nav>

    <div class="m-3 alert alert-info d-flex align-items-center" role="alert">
        <i class="info-icon bi bi-info-circle-fill" />
        The todos are updated optimistically. Press the ALT key while saving or deleting a todo to simulate
        an API error: The optimistic update will be rolled back.
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
                    <TodoDetail todo={$selectedTodo$} />
                </div>
            {/if}
        </div>
    </div>
</div>
