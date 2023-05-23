<script lang="ts">
    import { imageId } from '$lib/store';
    import { applicationState } from '$lib/store';

    $: paused = $applicationState === 'paused';
</script>

{#if $imageId}
    <img
        class="rounded-t"
        class:paused
        src="https://images.unsplash.com/photo-{$imageId}?w=400&q=80"
        alt=""
    />
{/if}

<style>
    .paused {
        filter: blur(50px);
    }
</style>
