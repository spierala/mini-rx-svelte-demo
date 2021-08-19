<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import TodoList from './modules/todo/components/todo-list.svelte';
	import CartList from './modules/cart/components/cart-list.svelte';
	import ProductShell from './modules/product/components/product-list.svelte';
	import facade from "./modules/product/state/product-facade.service";
	import { Observable } from 'rxjs';

	const cartItemsAmount$: Observable<number> = facade.cartItemsAmount$;

	function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
		const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

		// The object returned here is spread on the anchor element's attributes
		if (isActive) {
			return { class: "nav-link active" };
		}
		return { class: "nav-link" };
	}
</script>
<Router url="/">
	<div class="w-100 h-100 d-flex flex-column">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
			<a class="navbar-brand">
				<img src="assets/mini-rx-logo.svg" width="48" alt="Mini Rx Store Logo" class="d-inline-block align-top mr-2">
				MiniRx Store Demo
			</a>
			<ul class="d-flex flex-grow-1 navbar-nav mr-auto mt-2 mt-lg-0">
				<li class="nav-item">
					<Link to="/" getProps="{getProps}">Todos</Link>
				</li>
				<li class="nav-item">
					<Link to="products" getProps="{getProps}">Products</Link>
				</li>
			</ul>
		</nav>
		<div class="flex-grow-1">
			<Route path="/" component="{TodoList}" />
			<Route path="/products"><ProductShell /></Route>
			<Route path="/cart"><CartList /></Route>
		</div>
	</div>
</Router>

