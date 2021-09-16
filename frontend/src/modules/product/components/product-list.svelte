<script lang="ts">
    import ProductDetail from './product-detail.svelte';
    import facade from "../state/product-facade.service";
    import clonedeep from 'lodash.clonedeep';
    import { map } from 'rxjs/operators';
    import { Observable } from 'rxjs';
    import { Product } from '../models/product';

    const products$: Observable<Product[]> = facade.products$;
    const selectedProduct$: Observable<Product> = facade.selectedProduct$.pipe(
        map(clonedeep), // Prevent mutating the state
    );
</script>

<button on:click={facade.newProduct}>
    New
</button>

<h1>Products</h1>
    <ul>
        {#each $products$ as product}
        <li on:click={facade.selectProduct(product)}>{product.productName}
            <button on:click|stopPropagation={facade.delete(product)}>[delete]</button>
            <button on:click|stopPropagation={facade.addProductToCart(product)}>[addToCart]</button>
        </li>
        {/each}
    </ul>

{#if $selectedProduct$ }
    <ProductDetail product="{$selectedProduct$}"></ProductDetail>
{/if}
