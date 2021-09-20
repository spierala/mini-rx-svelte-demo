<script lang="ts">
    import { userStore } from '../state/user-state.service';
    import UserForm from '../components/user-form.svelte';
    import { Observable } from 'rxjs';
    import  type { User, Permissions } from '../state/user-state.service';

    const user$: Observable<User> = userStore.user$;
    const permissions$: Observable<Permissions> = userStore.permissions$;

</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-4">
        <a class="navbar-brand">
            User Profile
        </a>
    </nav>
    <UserForm user="{$user$}" permissions="{$permissions$}"></UserForm>
</div>

