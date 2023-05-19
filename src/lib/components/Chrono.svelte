<script lang="ts">
    import { id } from '$lib/imageStore';

    const minute: 60 = 60;

    let time: number = 0;
    let state: 'started' | 'paused' | 'clear' = 'paused';

    let poseDuration: number = 60;

    let start = () => {
        state = 'started';
    };
    let pause = () => {
        state = 'paused';
    };
    let clear = () => {
        state = 'clear';
    };

    let interval: number | null = null;

    $: {
        if (state == 'started' && interval == null) {
            interval = window.setInterval(() => {
                time += 1;

                if (time % poseDuration === 0) {
                    console.log(time, poseDuration);
                    id.next();
                }
            }, 1000);
        }

        if (state == 'paused') {
            interval && clearInterval(interval);
            interval = null;
        }

        if (state == 'clear') {
            time = 0;
            interval && clearInterval(interval);
            interval = null;
            state = 'paused';
        }
    }

    $: mm = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
    $: ss = (time % 60).toString().padStart(2, '0');
</script>

<div class="w-[400px]">
    Pose time:
    <label>
        <input
            type="radio"
            bind:group={poseDuration}
            name="pose-duration"
            value={minute}
            checked={true}
        />
        1 minute
    </label>

    <label>
        <input type="radio" bind:group={poseDuration} name="pose-duration" value={3 * minute} />
        3 minutes
    </label>

    <label>
        <input type="radio" bind:group={poseDuration} name="pose-duration" value={10 * minute} />
        10 minutes
    </label>

    <button class="px-2 border rounded border-gray-800" on:click={start}>Start</button>
    <button class="px-2 border rounded border-gray-800" on:click={pause}>Pause</button>
    <button class="px-2 border rounded border-gray-800" on:click={clear}>Clear</button>
    {mm}:{ss}
</div>
