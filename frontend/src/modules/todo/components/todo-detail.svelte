<script lang="ts">
    import { todosStore } from '../../../stores';
    import { Todo } from '../models/todo';

    export let todo: Todo;

    function onSubmit() {
        if (todo.id) {
            todosStore.update(todo);
        } else {
            todosStore.create(todo);
        }
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <label>Name</label>
    <input type="text" name="title" bind:value={todo.title}/>
    <div>
        <input type="checkbox" id="isDone" name="isDone"
               bind:checked={todo.isDone}>
        <label for="isDone">Done</label>
    </div>
    <div>
        <input type="checkbox" id="isPrivate" name="isPrivate"
               bind:checked={todo.isPrivate}>
        <label for="isPrivate">isPrivate</label>
    </div>
    <div>
        <input type="checkbox" id="isBusiness" name="isBusiness"
               bind:checked={todo.isBusiness}>
        <label for="isBusiness">isBusiness</label>
    </div>

    <button type="submit">Submit</button>
</form>
