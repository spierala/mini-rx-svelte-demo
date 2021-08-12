<script lang="ts">
    import ProductDetail from './product-detail.svelte';
    import facade from "../state/product-facade.service";
    import clonedeep from 'lodash.clonedeep';
    import { map, tap } from 'rxjs/operators';
    import { Observable } from 'rxjs';
    import { Product } from '../models/product';

    const products$: Observable<Product[]> = facade.products$;
    const selectedProduct$: Observable<Product> = facade.selectedProduct$.pipe(
        tap(console.log),
        map(clonedeep), // Prevent mutating the state
    );

    function selectProduct(product: Product) {
        facade.productSelected(product);
    }

    function addProduct() {
        facade.newProduct();
    }

    function deleteProduct(product: Product) {
        facade.delete(product);
    }
</script>

<button on:click={addProduct}>
    New
</button>

<h1>Products</h1>
{#each $products$ as product}
    <ul>
        <li on:click={selectProduct(product)}>{product.productName} <button on:click|stopPropagation={deleteProduct(product)}>[delete]</button></li>
    </ul>
{/each}

{#if $selectedProduct$ }
    <ProductDetail product="{$selectedProduct$}"></ProductDetail>
{/if}
