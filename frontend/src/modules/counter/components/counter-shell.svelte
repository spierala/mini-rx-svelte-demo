<script>
    import Counter from './counter.svelte';
</script>

<div class="d-flex flex-column h-100">
    <nav class="navbar navbar-light bg-light mb-1">
        <a class="navbar-brand">Counters</a>
    </nav>

    <div class="d-flex flex-column flex-grow-1 h-100">
        <div class="m-3 alert alert-info d-flex align-items-center" role="alert">
            <i class="info-icon bi bi-info-circle-fill"></i>
            <div>
                Every Counter component has its own <strong>Feature Store</strong> instance. The Counter states become part of the <strong>global state</strong> object.
                The Counter states are removed from the global state object when the components are destroyed.
            </div>
        </div>

        <div class="d-flex justify-content-between p-5">
            <Counter />
            <Counter />
            <Counter />
            <Counter />
        </div>
    </div>
</div>
