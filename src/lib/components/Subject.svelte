<script lang="ts">
    import { id } from '$lib/imageStore';
    import { state } from '$lib/chronoStore';

    $: paused = $state === 'paused';
</script>

<style>
    .paused {
        filter:blur(50px)
    }
</style>

<img
    class="rounded-t" class:paused
    src="https://images.unsplash.com/photo-{$id}?w=400&q=80"
    alt=""
/>
