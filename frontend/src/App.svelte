<script lang="ts">
	import Router, { link } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active'
	import TodoList from './modules/todo/components/todo-list.svelte';
	import ProductShell from './modules/product/components/product-list.svelte';
	import facade from "./modules/product/state/product-facade.service";
	import { Observable } from 'rxjs';

	const cartItemsAmount$: Observable<number> = facade.cartItemsAmount$;

	const routes = {
		'/': TodoList,
		'/products': ProductShell,
		'*': TodoList,
	}
</script>

<body>
	<div class="w-100 h-100 d-flex flex-column">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
			<a class="navbar-brand">
				<img src="assets/mini-rx-logo.svg" width="48" alt="Mini Rx Store Logo" class="d-inline-block align-top mr-2">
				MiniRx Store Demo
			</a>
			<ul class="d-flex flex-grow-1 navbar-nav mr-auto mt-2 mt-lg-0">
				<li class="nav-item">
					<a class="nav-link" href="/" use:link use:active={{className: 'active'}}>Todos</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/products" use:link use:link use:active={{className: 'active'}}>Products</a>
				</li>
			</ul>
		</nav>
		<div class="flex-grow-1">
			<Router {routes}/>
		</div>
	</div>
</body>
