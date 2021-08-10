<script>
    import {todoStore} from "../stores";

    const todos$ = todoStore.todosDone$;

    function handleClick() {
        todoStore.create({title: 'bla', id: 2, isDone: true})
    }
</script>

<button on:click={handleClick}>
    Create
</button>

{#each $todos$ as todo}
    <div>
        <span>{todo.title}</span>
    </div>
{/each}
