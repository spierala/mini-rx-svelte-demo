<script lang="ts">
	import { userStore } from './stores';
	import Router, { link } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active'
	import {wrap} from 'svelte-spa-router/wrap'
	import UserShell from "./modules/user/components/user-shell.svelte";
	import { Observable } from 'rxjs';
	import {productState} from "./modules/product/state/product-facade.service";

	const cartItemsAmount$: Observable<number> = productState.cartItemsAmount$;
	const userFullName$ = userStore.userFullName$;

	const routes = {
		'/': wrap({
			asyncComponent: () => import('./modules/todo/components/todo-list.svelte')
		}),
		'/products': wrap({
			asyncComponent: () => import('./modules/product/components/product-list.svelte')
		}),
		'/cart': wrap({
			asyncComponent: () => import('./modules/cart/components/cart-list.svelte')
		}),
		'/counter': wrap({
			asyncComponent: () => import('./modules/counter/components/counter-shell.svelte')
		}),
		'/user': UserShell,
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
				<li class="nav-item  mr-auto">
					<a class="nav-link" href="/counter" use:link use:link use:active={{className: 'active'}}>Counter</a>
				</li>
				<li class="nav-item">
					<a class="nav-link d-flex align-items-center" href="/user" use:link use:link use:active={{className: 'active'}}>
						<i class="bi bi-person-circle mr-1"></i>
						{ $userFullName$ }
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link d-flex align-items-center" href="/cart" use:link use:link use:active={{className: 'active'}}>
						<i class="bi bi-cart-fill mr-1"></i>
						<span class="mr-2">Cart</span>
						<span class="badge badge-light">
                        { $cartItemsAmount$ }
                    </span>
					</a>
				</li>
			</ul>
		</nav>
		<div class="flex-grow-1">
			<Router {routes}/>
		</div>
	</div>
</body>
