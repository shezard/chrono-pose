<script lang="ts">
    import Chrono from '$lib/components/Chrono.svelte';
    import TimingBar from '$lib/components/TimingBar.svelte';
    import Subject from '$lib/components/Subject.svelte';
    import Menu from '$lib/components/Menu.svelte';
    import { createStep } from '$lib/store.svelte';
    import { caf, raf } from '$lib/utils';

    let currentTheme = $state('portrait');

    let step = $state();
    $effect(() => {
        step = createStep(() => currentTheme);
    })

    let applicationState = $state('paused');
    let poseDuration = $state(60);

    let startTime = $state(0);
    let offsetEllapsedTime = $state(0);

    let rafId: number;
    let currentTime = $state(0);
    const update = () => {
        currentTime = +new Date();
        rafId = raf(update);
    };

    $effect(() => {
        update();

        return () => caf(rafId);
    });


    let ellapsedTime = $derived.by(() => {
            if (startTime === 0) {
                return offsetEllapsedTime;
            }

            return offsetEllapsedTime + Math.max(0, currentTime - startTime);
        }
    );
</script>

{#if step}
    <div class="w-screen flex justify-center">
        <div class="columns-1 flex flex-col justify-center w-screen overflow-y-hidden">
            <header>
                <Menu bind:currentTheme={currentTheme} {step} />
                <Subject image={step.image} {applicationState} />
                <TimingBar {poseDuration} {applicationState} {ellapsedTime} {offsetEllapsedTime} />
            </header>
            <Chrono bind:applicationState={applicationState} {step} {ellapsedTime} bind:offsetEllapsedTime={offsetEllapsedTime} bind:poseDuration={poseDuration} bind:startTime={startTime} />
        </div>
    </div>
{/if}
