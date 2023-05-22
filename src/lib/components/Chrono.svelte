<script lang="ts">
    import { imageId } from '$lib/imageStore';
    import { state, completionRate } from '$lib/chronoStore';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    const minute = 60 as const;

    let time = 0;

    let poseDuration = 60;

    let start = () => {
        state.update('started');
    };
    let pause = () => {
        state.update('paused');
    };
    let clear = () => {
        state.update('clear');
    };

    let interval: number | null = null;

    $: {
        if ($state === 'started' && interval == null) {
            interval = window.setInterval(() => {
                time += 1;

                completionRate.update((time % poseDuration) / poseDuration);

                if (time % poseDuration === 0) {
                    imageId.next();
                }
            }, 1000);
        }

        if ($state === 'paused') {
            interval && clearInterval(interval);
            interval = null;
        }

        if ($state === 'clear') {
            time = 0;
            interval && clearInterval(interval);
            interval = null;
            state.update('paused');
        }
    }

    $: mm = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
    $: ss = (time % 60).toString().padStart(2, '0');
</script>

<div class="py-4 flex justify-around">
    <RadioGroup>
        <RadioItem bind:group={poseDuration} name="pose-duration" value={minute}
            >(1 minute)</RadioItem
        >
        <RadioItem bind:group={poseDuration} name="pose-duration" value={3 * minute}
            >(3 minutes)</RadioItem
        >
        <RadioItem bind:group={poseDuration} name="pose-duration" value={10 * minute}
            >(10 minutes)</RadioItem
        >
    </RadioGroup>
</div>

<div class="flex justify-around pb-4">
    <button class="px-2 rounded variant-ringed-primary" on:click={start}>
        <span class={$state === 'started' ? 'animate-ping' : ''}>⏵</span> Start
    </button>
    <button class="px-2 rounded variant-ringed-primary" on:click={pause}>⏸ Pause</button>
    <button class="px-2 rounded variant-ringed-primary" on:click={clear}>⏹ Clear</button>
    {mm}:{ss}
</div>
