<script lang="ts">
    import { Observable } from 'rxjs';
    import { CounterStore } from './state/counter-store';

    let counterState: CounterStore = new CounterStore();
    let counter$: Observable<number> = counterState.count$;

    function increment() {
        counterState.increment();
    }

    function decrement() {
        counterState.decrement();
    }
</script>

<div class="w-100 d-flex flex-column align-items-center justify-content-center">
    <h1 class="display-1">{$counter$}</h1>
    <div>
        <button type="button" class="btn btn-outline-secondary mr-2" on:click={decrement}>
            Less
        </button>
        <button type="button" class="btn btn-outline-primary" on:click={increment}>More</button>
    </div>
</div>
