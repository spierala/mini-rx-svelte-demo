<script lang="ts">
    import { Observable } from 'rxjs';
    import { createFeatureStore, FeatureStore } from 'mini-rx-store';
    import { getCounterId } from './counter-id';
    import { onDestroy } from 'svelte';

    interface CounterState {
        count: number;
    }

    const initialState: CounterState = {
        count: 42,
    };

    let counterFs: FeatureStore<CounterState> = createFeatureStore('counter-' + getCounterId(), initialState);
    let counter$: Observable<number> = counterFs.select(state => state.count);

    function increment() {
        counterFs.setState(state => ({ count: state.count + 1 }), 'increment');
    }

    function decrement() {
        counterFs.setState(state => ({ count: state.count - 1 }), 'decrement');
    }

    onDestroy(() => {
        counterFs.destroy()
    });

</script>

<div class="w-100 d-flex flex-column align-items-center justify-content-center">
    <h1 class="display-1">{$counter$}</h1>
    <div>
        <button type="button" class="btn btn-outline-secondary mr-2" on:click="{decrement}">Less</button>
        <button type="button" class="btn btn-outline-primary" on:click="{increment}">More</button>
    </div>
</div>
