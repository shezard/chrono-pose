<script lang="ts">
    let { image, applicationState } = $props();
</script>

{#if image}
    <div class:paused={applicationState === 'paused'}>
        <img src={image.url} alt={image.alt} class="mx-auto"/>
        <a
            href="https://unsplash.com/@{image.author}"
            class="text-xs inline-block px-2 py-2"
            target="_blank"
        >
            Credit: @{image.author}
        </a>
    </div>
{/if}

<style>
    .paused {
        filter: blur(50px);
    }
</style>
