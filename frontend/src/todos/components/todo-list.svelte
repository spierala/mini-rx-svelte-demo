<script lang="ts">
    import TodoDetail from './todo-detail.svelte';
    import {todoStore} from "../stores";
    import clonedeep from 'lodash.clonedeep';
    import {map} from "rxjs/operators";

    const todosDone$ = todoStore.todosDone$;
    const todosNotDone$ = todoStore.todosNotDone$;
    const selectedTodo$ = todoStore.selectedTodo$.pipe(
        map(clonedeep), // Prevent mutating the state
    );

    function selectTodo(todo) {
        todoStore.selectTodo(todo);
    }

    function addTodo() {
        todoStore.initNewTodo();
    }

    function deleteTodo(todo) {
        todoStore.delete(todo);
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
