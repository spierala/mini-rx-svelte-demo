<script lang="ts">
    import { Todo } from '../models/todo';
    import { createEventDispatcher } from 'svelte';

    export let todos: Todo[];
    export let selectedTodo: Todo;

    const dispatch = createEventDispatcher();

    function selectTodo(todo: Todo) {
        dispatch('selectTodo', {
            todo,
        });
    }
</script>

<ul class="list-group">
    {#each todos as todo}
        <li
            class="list-group-item"
            class:active={selectedTodo?.id === todo.id}
            on:click={selectTodo(todo)}
        >
            {todo.title}
            {#if todo.isBusiness}<span class="badge badge-info mr-1">Business</span>{/if}
            {#if todo.isPrivate}<span class="badge badge-primary">Private</span>{/if}
        </li>
    {/each}
</ul>
