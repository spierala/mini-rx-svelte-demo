<script lang="ts">
    import facade from "../../product/state/product-facade.service";
    import { CartItem } from '../../product/models/cart-item';
    import { Observable } from 'rxjs';

    const cartItems$: Observable<CartItem[]> = facade.cartItems$;
</script>

<h1>Cart</h1>
{#each $cartItems$ as cartItem}
    <ul>
        <li>
            <div class="flex-grow-1">
                { cartItem.productName }
                <span class="badge badge-primary badge-pill">
                                    { cartItem.amount }
                                </span>
            </div>
            <div class="mr-2">
                { cartItem.total }
            </div>

            <span
                    class="btn bi bi-trash-fill text-danger"
                    on:click="{facade.removeProductFromCart(cartItem)}"
            ></span>
        </li>
    </ul>
{/each}
