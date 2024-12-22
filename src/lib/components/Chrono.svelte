<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    let {
        step,
        applicationState = $bindable(),
        poseDuration = $bindable(),
        ellapsedTime,
        offsetEllapsedTime = $bindable(),
        startTime = $bindable()
    } = $props();

    const minute = 60 as const;

    let secondTiming = $derived.by(() => {
        let t = ellapsedTime / 1000;

        if (applicationState === 'paused') {
            t = offsetEllapsedTime / 1000;
        }

        return Math.floor(t);
    });

    let ss = $derived.by(() => {
        if (secondTiming > 0 && secondTiming % poseDuration === 0) {
            step.next();
        }

        return (secondTiming % 60).toString().padStart(2, '0');
    });

    let mm = $derived(
        Math.floor(secondTiming / 60)
            .toString()
            .padStart(2, '0')
    );

    let start = () => {
        if (applicationState === 'started') {
            return;
        }
        applicationState = 'started';
        startTime = +new Date();
    };

    let pause = () => {
        if (applicationState === 'paused') {
            return;
        }
        applicationState = 'paused';
        offsetEllapsedTime = ellapsedTime;
        startTime = 0;
    };
    let clear = () => {
        step.next();
        applicationState = 'paused';
        offsetEllapsedTime = 0;
        startTime = 0;
    };
</script>

<div class="p-4 flex justify-between">
    <RadioGroup class="w-full">
        <RadioItem bind:group={poseDuration} name="pose-duration" value={minute}>
            1 minute
        </RadioItem>
        <RadioItem bind:group={poseDuration} name="pose-duration" value={3 * minute}>
            3 minutes
        </RadioItem>
        <RadioItem bind:group={poseDuration} name="pose-duration" value={10 * minute}>
            10 minutes
        </RadioItem>
    </RadioGroup>
</div>

<div class="flex justify-between pb-4 px-4">
    <button class="px-2 rounded variant-ringed" onclick={start}>
        <span class={applicationState === 'started' ? 'animate-ping' : ''}>
            <i class="mi-play"></i>
        </span> Start
    </button>
    <button class="px-2 rounded variant-ringed" onclick={pause}>
        <i class="mi-pause"></i> Pause
    </button>
    <button class="px-2 rounded variant-ringed" onclick={clear}>
        <i class="mi-refresh"></i> Clear
    </button>
    <span class="px-2 rounded variant-ringed">
        {mm}:{ss}
    </span>
</div>
