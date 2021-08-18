<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import TodoList from './modules/todo/components/todo-list.svelte';
	import CartList from './modules/cart/components/cart-list.svelte';
	import ProductShell from './modules/product/components/product-list.svelte';
	import facade from "./modules/product/state/product-facade.service";
	import { Observable } from 'rxjs';

	const cartItemsAmount$: Observable<number> = facade.cartItemsAmount$;
</script>

<Router url="todos">
	<nav>
		<Link to="todos">Todos</Link>
		<Link to="products">Products</Link>
		<Link to="cart">Cart  [{$cartItemsAmount$}]</Link>
	</nav>
	<div>
		<Route path="/todos" component="{TodoList}" />
		<Route path="/products"><ProductShell /></Route>
		<Route path="/cart"><CartList /></Route>
	</div>
</Router>
