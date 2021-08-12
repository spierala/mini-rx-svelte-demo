<script lang="ts">
    import facade from "../state/product-facade.service";
    import { Product } from '../models/product';

    export let product: Product;

    function onSubmit() {
        if (product.id) {
            facade.update(product);
        } else {
            facade.create(product);
        }
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <label>Name</label>
    <input type="text" name="title" bind:value={product.productName} />

    <button type="submit">Submit</button>
</form>
