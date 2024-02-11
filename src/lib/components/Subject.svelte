<script lang="ts">
    import { image } from '$lib/store';
    import { applicationState } from '$lib/store';

    $: paused = $applicationState === 'paused';
</script>

{#if $image}
    <div class:paused>
        <img src={$image.url} alt={$image.alt} />
        <a
            href="https://unsplash.com/@{$image.author}"
            class="text-xs inline-block px-2 py-2"
            target="_blank"
        >
            Credit: @{$image.author}
        </a>
    </div>
{/if}

<style>
    .paused {
        filter: blur(50px);
    }
</style>
