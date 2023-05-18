<script lang="ts">
    let time: number = 0;
    let state: 'started' | 'paused' | 'clear' = 'paused';

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

<div>
    <button on:click={start}>Start</button>
    <button on:click={pause}>Pause</button>
    <button on:click={clear}>Clear</button>
    {mm}:{ss}
</div>
