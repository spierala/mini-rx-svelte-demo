<script lang="ts">
    import {Observable} from "rxjs";
    import {ArtStoreService} from "../state/art-store";

    const artStore = new ArtStoreService();

    const opacity$: Observable<number> = artStore.opacity$;

    function reset() {
        artStore.reset();
    }
</script>

<style>
    .outer {
        width: 20px;
        height: 20px;
        border: 1px solid white;
    }

    .inner {
        background: #a4c400;
        width: 100%;
        height: 100%;
        transition: opacity 0.2s;
    }

</style>

<div class="outer" on:mouseover={reset}>
    <div class="inner" style="opacity: {$opacity$};"></div>
</div>

