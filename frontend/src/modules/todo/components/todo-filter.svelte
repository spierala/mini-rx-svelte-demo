<script lang="ts">
    import { todoStore } from '../state/todo.store';
    import { Filter } from '../models/filter';

    export let filter: Filter;

    function updateFilter(newFilter: Partial<Filter>) {
        todoStore.updateFilter({
            ...filter,
            ...newFilter,
        });
    }
</script>

<form class="d-flex m-0">
    <div class="mb-0 mr-2">
        <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Search todos"
            on:input={(e) => updateFilter({ search: e.target.value })}
        />
    </div>
    <div class="d-flex align-items-center">
        <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="checkbox"
                id="filterIsPrivate"
                on:change={() =>
                    updateFilter({
                        category: {
                            isBusiness: filter.category.isBusiness,
                            isPrivate: !filter.category.isPrivate,
                        },
                    })}
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
                on:change={() =>
                    updateFilter({
                        category: {
                            isBusiness: !filter.category.isBusiness,
                            isPrivate: filter.category.isPrivate,
                        },
                    })}
            />
            <label class="form-check-label font-weight-bold text-info" for="filterIsBusiness">
                Business
            </label>
        </div>
    </div>
</form>
