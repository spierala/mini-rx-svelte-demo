<script lang="ts">
    import PixelArt from './pixel-art.svelte';

    function numSequence(n: number): Array<number> {
        return Array(n);
    }
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-1">
        <a class="navbar-brand">Pixel Art</a>
    </nav>

    <div class="m-3 alert alert-info d-flex align-items-center" role="alert">
        <i class="info-icon bi bi-info-circle-fill"></i>
        <div>
            Every Pixel Component has its own <strong>Component Store</strong> instance.
            The state of a Component Store is <strong>local</strong> and does not become part of the global state object.
        </div>
    </div>

    <div class="d-flex flex-wrap">
        {#each numSequence(2500) as item}
            <PixelArt></PixelArt>
        {/each}
    </div>
</div>
