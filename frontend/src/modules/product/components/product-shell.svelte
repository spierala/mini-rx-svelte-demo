<script lang="ts">
    import ProductDetail from './product-detail.svelte';
    import { productState } from '../state/product-store.facade';
    import clonedeep from 'lodash.clonedeep';
    import { map, withLatestFrom } from 'rxjs/operators';
    import { Observable } from 'rxjs';
    import { Product } from '../models/product';
    import { userStore } from '../../../stores';
    import type { Permissions } from '../../user/state/user-store';
    import ProductList from './product-list.svelte';
    import ProductFilter from './product-filter.svelte';

    const products$: Observable<Product[]> = productState.products$;
    const selectedProduct$: Observable<Product> = productState.selectedProduct$.pipe(
        map(clonedeep) // Prevent mutating the state
    );

    const permissions$: Observable<Permissions> = userStore.permissions$;
    const search$: Observable<string> = productState.search$;
    const displayCode$: Observable<boolean> = productState.displayCode$;
    const detailTitle$: Observable<string> = productState.detailTitle$;
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-4">
        <a class="navbar-brand">Products</a>
        <div class="d-flex flex-grow-1 mb-2 justify-content-between mt-2">
            <div>
                {#if $permissions$.canUpdateProducts}
                    <button class="btn btn-primary btn-sm" on:click={productState.newProduct}>
                        New
                    </button>
                {/if}
            </div>
            <ProductFilter search={$search$} />
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col">
                <ProductList
                    products={$products$}
                    showCartBtn={!$permissions$.canUpdateProducts}
                    displayCode={$displayCode$}
                    selectedProduct={$selectedProduct$}
                />
            </div>
            {#if $selectedProduct$}
                <div class="col">
                    <ProductDetail
                        product={$selectedProduct$}
                        permissions={$permissions$}
                        detailTitle={$detailTitle$}
                    />
                </div>
            {/if}
        </div>
    </div>
</div>
