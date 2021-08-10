<script lang="ts">
    import {todoStore} from "../stores";
    import { Todo } from '../models/todo';

    export let todo;

    function onSubmit(e) {
        const formData = new FormData(e.target);
        const formValue = {};
        for (let field of formData) {
            const [key, value] = field;
            formValue[key] = value;
        }

        const newTodo: Todo = {
            ...todo,
            ...formValue,
        };

        if (newTodo.id) {
            todoStore.update(newTodo);
        } else {
            todoStore.create(newTodo);
        }
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <label>Name</label>
    <input type="text" name="title" value={todo.title} />
    <button type="submit">Submit</button>
</form>
