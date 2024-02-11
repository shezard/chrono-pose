<script lang="ts">
    import { currentTheme, step, themes } from '$lib/store';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function closeMenu() {
        isOpen = false;
        step.next();
    }
</script>

<div class="absolute z-10 p-4 gap-2 flex flex-col items-start">
    <button class="px-2 rounded variant-filled" on:click={toggleMenu}>
        <i class="mi-menu" /> <span class="capitalize">{$currentTheme}</span>
    </button>

    <div class:isOpen class="hidden">
        <RadioGroup flexDirection="flex-col">
            {#each $themes as theme}
                <RadioItem bind:group={$currentTheme} name="pose-duration" class="!text-left" value={theme} on:click={closeMenu}>
                    <span class="capitalize">{theme}</span>
                </RadioItem>
            {/each}
        </RadioGroup>
    </div>
</div>

<style>
    .isOpen {
        position: relative;
        display: block !important;
    }
</style>
