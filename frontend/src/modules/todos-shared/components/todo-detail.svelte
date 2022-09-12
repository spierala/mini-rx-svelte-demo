<script lang="ts">
    import { Todo } from '../models/todo';
    import { createEventDispatcher } from 'svelte';

    export let todo: Todo;

    const dispatch = createEventDispatcher<{create: Todo, update: Todo, delete: Todo, close: void}>();

    function onSubmit() {
        if (todo.id) {
            dispatch('update', todo);
        } else {
            dispatch('create', todo);
        }
    }

    function deleteTodo() {
        dispatch('delete', todo);
    }

    function close() {
        dispatch('close');
    }
</script>

<div class="card h-100">
    <div class="card-header">
        <span>{todo.id ? 'Edit Todo' : 'Create Todo'}</span>
        <button on:click={close(todo)} type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="card-body">
        <form on:submit|preventDefault={onSubmit}>
            <div class="form-group">
                <label for="title">Title</label>
                <input
                    class="form-control"
                    type="text"
                    bind:value={todo.title}
                    required
                    id="title"
                    name="title"
                    placeholder="Name (required)"
                />
            </div>
            <div class="form-group">
                <label for="isDone">Status</label>
                <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="isDone"
                        bind:checked={todo.isDone}
                        name="isDone"
                    />
                    <label class="custom-control-label" for="isDone">Done</label>
                </div>
            </div>
            <div class="form-group">
                <label class="d-block">Categories</label>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="isPrivate"
                        name="isPrivate"
                        bind:checked={todo.isPrivate}
                    />
                    <label class="form-check-label text-primary" for="isPrivate">Private</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="isBusiness"
                        name="isBusiness"
                        bind:checked={todo.isBusiness}
                    />
                    <label class="form-check-label text-info" for="isBusiness">Business</label>
                </div>
            </div>
            <button class="btn btn-primary mr-2" type="submit">Save</button>
            {#if todo.id}
                <button class="btn btn-primary btn-danger" on:click={deleteTodo} type="button">
                    Delete
                </button>
            {/if}
        </form>
    </div>
</div>
