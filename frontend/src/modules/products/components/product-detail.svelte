<script lang="ts">
    import { productStoreFacade } from '../state/product-store.facade';
    import { Product } from '../models/product';
    import type { Permissions } from '../../user/state/user-store';

    export let product: Product;
    export let permissions: Permissions;
    export let detailTitle: string;

    function onSubmit() {
        if (product.id) {
            productStoreFacade.update(product);
        } else {
            productStoreFacade.create(product);
        }
    }

    function onClose() {
        productStoreFacade.clearCurrentProduct();
    }

    function onDelete() {
        productStoreFacade.delete(product);
    }
</script>

<div class="card h-100">
    <div class="card-header">
        <span>{detailTitle}</span>
        <button on:click={onClose} type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="card-body">
        <form>
            <fieldset disabled={!permissions.canUpdateProducts}>
                <div class="form-group">
                    <label for="productName">Name</label>
                    <input
                        class="form-control"
                        type="text"
                        bind:value={product.productName}
                        required
                        id="productName"
                        name="productName"
                        placeholder="Name (required)"
                    />
                </div>
                <div class="form-group">
                    <label for="productCode">Code</label>
                    <input
                        class="form-control"
                        type="text"
                        bind:value={product.productCode}
                        required
                        id="productCode"
                        name="productCode"
                        placeholder="Code (required)"
                    />
                </div>
                <div class="form-group">
                    <label for="starRating">Star Rating (1-5)</label>
                    <input
                        class="form-control"
                        type="text"
                        placeholder="Rating"
                        bind:value={product.starRating}
                        id="starRating"
                        name="starRating"
                    />
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input
                        class="form-control"
                        type="text"
                        bind:value={product.price}
                        required
                        id="price"
                        name="price"
                        placeholder="Price (required)"
                    />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea
                        class="form-control"
                        placeholder="Description"
                        rows="3"
                        bind:value={product.description}
                        id="description"
                        name="description"
                    />
                </div>
            </fieldset>
            {#if permissions.canUpdateProducts}
                <button type="button" class="btn btn-primary mr-2" on:click={onSubmit}>Save</button>
                {#if product.id}
                    <button type="button" class="btn btn-primary btn-danger" on:click={onDelete}>
                        Delete
                    </button>
                {/if}
            {/if}
        </form>
    </div>
</div>
