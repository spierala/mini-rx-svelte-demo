<script lang="ts">
    import { Product } from '../models/product';

    export let products: Product[];
    export let selectedProduct: Product;
    export let displayCode: boolean;
    export let showCartBtn: boolean;

    function addToCart(product: Product) {
        console.log('addToCart', product);
    }
</script>

<style>
    .bi-cart-plus-fill {
        font-size: 24px;
    }

    .active .bi-cart-plus-fill {
        color: #fff !important;
    }
</style>

<div class="card h-100">
    <div class="card-header d-flex">
        <span class="flex-grow-1">Products</span>
        <label>
            <input
                    class="form-check-input"
                    type="checkbox"
                    bind:checked={displayCode}
            />
            Display Product Code
        </label>
    </div>
    <ul class="list-group">
        {#each products as product}
        <li
                class="list-group-item d-flex align-items-center"
                class:active="{selectedProduct?.id === product.id}"
        >
            <span class="flex-grow-1">
                { product.productName }
                {#if displayCode }({ product.productCode }){/if}
            </span>
            <div class="mr-2">
                { product.price }
            </div>

            {#if showCartBtn }
            <span
                    class="btn bi bi-cart-plus-fill text-primary"
                    on:click|stopPropagation={addToCart(product)}
            ></span>
            {/if}
        </li>
        {/each}
    </ul>
</div>
