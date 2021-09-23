<script lang="ts">
    import { productState } from '../state/product-store.facade';

    export let search: string;
</script>

<form class="d-flex m-0">
    <div class="mb-0 mr-2">
        <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Search todos"
            value={search}
            on:input={(e) => productState.updateSearch(e.target.value)}
        />
    </div>
</form>
