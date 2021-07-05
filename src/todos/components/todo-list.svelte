<script>
    import {todoState} from "../../main";

    const todos$ = todoState.todosDone$;

    function handleClick() {
        todoState.create({title: 'bla', id: 2, isDone: true})
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
