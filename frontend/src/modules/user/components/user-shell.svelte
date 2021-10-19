<script lang="ts">
    import { userStore } from '../../../stores';
    import UserForm from '../components/user-form.svelte';
    import { Observable } from 'rxjs';
    import type { User, Permissions } from '../state/user-store';

    const user$: Observable<User> = userStore.user$;
    const permissions$: Observable<Permissions> = userStore.permissions$;
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-4">
        <span class="navbar-brand">User Profile</span>
    </nav>
    <UserForm user={$user$} permissions={$permissions$} />
</div>
