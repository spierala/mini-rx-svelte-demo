<script lang="ts">
    import ProductDetail from './product-detail.svelte';
    import { productState } from "../state/product-facade.service";
    import clonedeep from 'lodash.clonedeep';
    import { map } from 'rxjs/operators';
    import { Observable } from 'rxjs';
    import { Product } from '../models/product';

    const products$: Observable<Product[]> = productState.products$;
    const selectedProduct$: Observable<Product> = productState.selectedProduct$.pipe(
        map(clonedeep), // Prevent mutating the state
    );
</script>

<button on:click={productState.newProduct}>
    New
</button>

<h1>Products</h1>
    <ul>
        {#each $products$ as product}
        <li on:click={productState.selectProduct(product)}>{product.productName}
            <button on:click|stopPropagation={productState.delete(product)}>[delete]</button>
            <button on:click|stopPropagation={productState.addProductToCart(product)}>[addToCart]</button>
        </li>
        {/each}
    </ul>

{#if $selectedProduct$ }
    <ProductDetail product="{$selectedProduct$}"></ProductDetail>
{/if}
