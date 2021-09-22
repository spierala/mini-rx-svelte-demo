<script lang="ts">
    import { todosStore } from '../state/todos.store';
    import { Filter } from '../models/filter';

    export let filter: Filter;
</script>

<form class="d-flex m-0">
    <div class="mb-0 mr-2">
        <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Search todos"
            on:input={(e) => todosStore.search(e.target.value)}
        />
    </div>
    <div class="d-flex align-items-center">
        <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="checkbox"
                id="filterIsPrivate"
                bind:checked={filter.category.isPrivate}
                on:change={() => todosStore.toggleIsPrivate()}
            />
            <label class="form-check-label font-weight-bold text-primary" for="filterIsPrivate">
                Private
            </label>
        </div>
        <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="checkbox"
                id="filterIsBusiness"
                bind:checked={filter.category.isBusiness}
                on:change={() => todosStore.toggleIsBusiness()}
            />
            <label class="form-check-label font-weight-bold text-info" for="filterIsBusiness">
                Business
            </label>
        </div>
    </div>
</form>
