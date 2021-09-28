<script lang="ts">
    import { productStoreFacade } from '../state/product-store.facade';

    export let search: string;
</script>

<form class="d-flex m-0">
    <div class="mb-0 mr-2">
        <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Search products"
            value={search}
            on:input={(e) => productStoreFacade.updateSearch(e.target.value)}
        />
    </div>
</form>
