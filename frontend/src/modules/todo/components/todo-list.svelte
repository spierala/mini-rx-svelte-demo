<script lang="ts">
    import TodoDetail from './todo-detail.svelte';
    import TodoFilter from './todo-filter.svelte';
    import {todosStore} from "../../../stores";
    import clonedeep from 'lodash.clonedeep';
    import { map } from 'rxjs/operators';

    const todosDone$ = todosStore.todosDone$;
    const todosNotDone$ = todosStore.todosNotDone$;
    const selectedTodo$ = todosStore.selectedTodo$.pipe(
        map(clonedeep), // Prevent mutating the state
    );
    const filter$ = todosStore.filter$.pipe(
        map(clonedeep), // Prevent mutating the state
    );

    function selectTodo(todo) {
        todosStore.selectTodo(todo);
    }

    function addTodo() {
        todosStore.initNewTodo();
    }

    function deleteTodo(todo) {
        todosStore.delete(todo);
    }
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-4">
        <a class="navbar-brand">
            Todos
        </a>
        <div class="d-flex flex-grow-1 mb-2 justify-content-between mt-2">
            <button class="btn btn-primary btn-sm" on:click={addTodo}>New</button>
            <TodoFilter filter="{$filter$}"></TodoFilter>
        </div>
    </nav>

    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card h-100">
                    <div class="card-header">
                        <span>Todos</span>
                    </div>
                    {#each $todosNotDone$ as todo}
                        <ul>
                            <li on:click={selectTodo(todo)}>{todo.title} <button on:click|stopPropagation={deleteTodo(todo)}>[delete]</button></li>
                        </ul>
                    {/each}
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="card-header">
                        <span>Todos Done</span>
                    </div>
                    {#each $todosDone$ as todo}
                        <ul>
                            <li on:click={selectTodo(todo)}>{todo.title} b: {todo.isBusiness} p: {todo.isPrivate}</li>
                        </ul>
                    {/each}
                </div>
            </div>
            {#if $selectedTodo$ }
                <div class="col">
                    <TodoDetail todo="{$selectedTodo$}"></TodoDetail>
                </div>
            {/if}
        </div>
    </div>
</div>
