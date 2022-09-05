import { Observable } from 'rxjs';
import { FeatureStore } from 'mini-rx-store';
import { onDestroy } from 'svelte';

interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 42,
};

export class CounterStore extends FeatureStore<CounterState> {
    count$: Observable<number> = this.select((state) => state.count);

    constructor() {
        super('counter', initialState, {multi: true});

        onDestroy(() => {
            this.destroy();
        });
    }

    increment() {
        this.setState({ count: this.state.count + 1 }, 'increment');
    }

    decrement() {
        this.setState({ count: this.state.count - 1 }, 'decrement');
    }
}
