<script lang="ts">
    import { themes } from '$lib/store.svelte';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    let { currentTheme = $bindable(), step } = $props();

    let isOpen = $state(false);

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function closeMenu() {
        isOpen = false;
        step.next();
    }
</script>

<div class="absolute z-10 p-4 gap-2 flex flex-col">
    <button class="px-2 rounded variant-filled" onclick={toggleMenu}>
        <i class="mi-menu"></i>
        <span class="capitalize">{currentTheme}</span>
        <span class="text-xs">({step.value}/{step.stepNumber})</span>
    </button>

    <div class:isOpen class="hidden">
        <RadioGroup flexDirection="flex-col">
            {#each themes as theme}
                <RadioItem
                    bind:group={currentTheme}
                    name="pose-duration"
                    class="!text-left"
                    value={theme}
                    on:click={closeMenu}
                >
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
