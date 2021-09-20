<script lang="ts">
    import { userStore } from '../state/user-state.service';
    import  type { User, Permissions } from '../state/user-state.service';

    export let user: User;
    export let permissions: Permissions;

</script>

<div class="container">
        <div class="form-group">
            <label for="firstName">First name</label>
            <input
                    class="form-control"
                    type="text"
                    value={user.firstName}
                    on:input={e => userStore.updateUser({ firstName: e.target.value })}
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
            />
        </div>
        <div class="form-group">
            <label for="lastName">Last name</label>
            <input
                    class="form-control"
                    type="text"
                    value={user.lastName}
                    on:input={e => userStore.updateUser({ lastName: e.target.value })}
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
            />
        </div>

    <div class="card">
        <div class="card-header d-flex">
            <span class="flex-grow-1">Permissions</span>
        </div>
        <div class="card-body">
            <div class="form-group">
                <div class="custom-control custom-switch">
                    <input
                            type="checkbox"
                            class="custom-control-input"
                            id="canUpdateProducts"
                            name="canUpdateProducts"
                            value={permissions.canUpdateProducts}
                            on:input={e => userStore.toggleCanUpdateProducts()}
                    />
                    <label class="custom-control-label" for="canUpdateProducts">
                        CanUpdateProducts
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>
