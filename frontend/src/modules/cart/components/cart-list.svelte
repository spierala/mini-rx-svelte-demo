<script lang="ts">
    import { productStoreFacade } from '../../product/state/product-store.facade';
    import { CartItem } from '../../product/models/cart-item';
    import { Observable } from 'rxjs';

    const cartItems$: Observable<CartItem[]> = productStoreFacade.cartItems$;
    const hasCartItems$: Observable<boolean> = productStoreFacade.hasCartItems$;
    const cartTotalPrice$: Observable<number> = productStoreFacade.cartTotalPrice$;
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-4">
        <span class="navbar-brand">Cart</span>
    </nav>

    <div class="container">
        <div class="row">
            <div class="col">
                {#if $hasCartItems$}
                    <div class="card-header d-flex">
                        <span class="flex-grow-1">Your shopping cart</span>
                    </div>
                    <ul class="list-group">
                        {#each $cartItems$ as item}
                            <li class="list-group-item d-flex align-items-center">
                                <div class="flex-grow-1">
                                    {item.productName}
                                    <span class="badge badge-primary badge-pill">
                                        {item.amount}
                                    </span>
                                </div>
                                <div class="mr-2">
                                    {item.total}
                                </div>

                                <span
                                    class="btn bi bi-trash-fill text-danger"
                                    on:click={productStoreFacade.removeProductFromCart(item)}
                                />
                            </li>
                        {/each}
                    </ul>
                    <div class="card-footer">
                        <h5>Total: {$cartTotalPrice$}</h5>
                    </div>
                {:else}
                    <h5 class="text-center text-muted">There is nothing in your shopping cart.</h5>
                {/if}
            </div>
        </div>
    </div>
</div>
