<script lang="ts">
	import TodoList from './todos/components/todo-list.svelte';

	let showTodos = false;

	function handleClick() {
		showTodos = !showTodos;
	}
</script>

<main>
	<button on:click={handleClick}>
		Toggle Todos
	</button>
	{#if showTodos }
		<TodoList/>
	{/if}
</main>
