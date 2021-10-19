<script lang="ts">
    import ProductDetail from './product-detail.svelte';
    import { productStoreFacade } from '../state/product-store.facade';
    import clonedeep from 'lodash.clonedeep';
    import { map } from 'rxjs/operators';
    import { Observable } from 'rxjs';
    import { Product } from '../models/product';
    import { userStore } from '../../../stores';
    import type { Permissions } from '../../user/state/user-store';
    import ProductList from './product-list.svelte';
    import ProductFilter from './product-filter.svelte';

    const products$: Observable<Product[]> = productStoreFacade.products$;
    const selectedProduct$: Observable<Product> = productStoreFacade.selectedProduct$.pipe(
        map(clonedeep) // Prevent mutating the state
    );
    const permissions$: Observable<Permissions> = userStore.permissions$;
    const search$: Observable<string> = productStoreFacade.search$;
    const displayCode$: Observable<boolean> = productStoreFacade.displayCode$;
    const detailTitle$: Observable<string> = productStoreFacade.detailTitle$;
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-4">
        <span class="navbar-brand">Products</span>
        <div class="d-flex flex-grow-1 mb-2 justify-content-between mt-2">
            <div>
                {#if $permissions$.canUpdateProducts}
                    <button class="btn btn-primary btn-sm" on:click={productStoreFacade.newProduct}>
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
