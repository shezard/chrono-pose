<script lang="ts">
    import {
        applicationState,
        poseDuration,
        ellapsedTime,
        startTime,
        offsetEllapsedTime,
        mm,
        ss
    } from '$lib/store';
    import { animate } from '$lib/utils';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    const minute = 60 as const;

    let start = () => {
        if ($applicationState === 'started') {
            return;
        }
        animate(() => {
            applicationState.update('started');
            startTime.set(+new Date());
        });
    };

    let pause = () => {
        if ($applicationState === 'paused') {
            return;
        }
        animate(() => {
            applicationState.update('paused');
            offsetEllapsedTime.set($ellapsedTime);
            startTime.set(0);
        });
    };
    let clear = () => {
        animate(() => {
            applicationState.update('clear');
            offsetEllapsedTime.set(0);
            startTime.set(0);
        });
    };
</script>

<div class="py-4 flex justify-around">
    <RadioGroup>
        <RadioItem bind:group={$poseDuration} name="pose-duration" value={minute}
            >(1 minute)</RadioItem
        >
        <RadioItem bind:group={$poseDuration} name="pose-duration" value={3 * minute}
            >(3 minutes)</RadioItem
        >
        <RadioItem bind:group={$poseDuration} name="pose-duration" value={10 * minute}
            >(10 minutes)</RadioItem
        >
    </RadioGroup>
</div>

<div class="flex justify-around pb-4">
    <button class="px-2 rounded variant-ringed" on:click={start}>
        <span class={$applicationState === 'started' ? 'animate-ping' : ''}>
            <i class="mi-play" />
        </span> Start
    </button>
    <button class="px-2 rounded variant-ringed" on:click={pause}>
        <i class="mi-pause" /> Pause
    </button>
    <button class="px-2 rounded variant-ringed" on:click={clear}>
        <i class="mi-refresh" /> Clear
    </button>
    <span class="px-2">
        {$mm}:{$ss}
    </span>
</div>
