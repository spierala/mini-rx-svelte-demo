<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import TodoList from './modules/todo/components/todo-list.svelte';
	import ProductShell from './modules/product/components/product-list.svelte';
</script>

<Router url="todos">
	<nav>
		<Link to="todos">Todos</Link>
		<Link to="products">Products</Link>
	</nav>
	<div>
		<Route path="/todos" component="{TodoList}" />
		<Route path="/products"><ProductShell /></Route>
	</div>
</Router>
