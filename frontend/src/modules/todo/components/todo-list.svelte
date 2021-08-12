<script lang="ts">
    import TodoDetail from './todo-detail.svelte';
    import {todosStore} from "../../../stores";
    import clonedeep from 'lodash.clonedeep';
    import { map, tap } from 'rxjs/operators';

    const todosDone$ = todosStore.todosDone$;
    const todosNotDone$ = todosStore.todosNotDone$;
    const selectedTodo$ = todosStore.selectedTodo$.pipe(
        tap(console.log),
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

<button on:click={addTodo}>
    New
</button>

<h1>Todos Done</h1>
{#each $todosDone$ as todo}
    <ul>
        <li on:click={selectTodo(todo)}>{todo.title}</li>
    </ul>
{/each}

<h1>Todos Not Done</h1>
{#each $todosNotDone$ as todo}
    <ul>
        <li on:click={selectTodo(todo)}>{todo.title} <button on:click|stopPropagation={deleteTodo(todo)}>[delete]</button></li>
    </ul>
{/each}

{#if $selectedTodo$ }
    <TodoDetail todo="{$selectedTodo$}"></TodoDetail>
{/if}
