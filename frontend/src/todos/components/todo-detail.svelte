<script lang="ts">
    import {todoStore} from "../stores";
    import { Todo } from '../models/todo';

    export let todo: Todo;

    function onSubmit() {
        if (todo.id) {
            todoStore.update(todo);
        } else {
            todoStore.create(todo);
        }
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <label>Name</label>
    <input type="text" name="title" bind:value={todo.title} />
    <div>
        <input type="checkbox" id="isDone" name="isDone"
               bind:checked={todo.isDone}>
        <label for="isDone">Done</label>
    </div>

    <button type="submit">Submit</button>
</form>
