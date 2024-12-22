<script>

    const {applicationState, poseDuration, ellapsedTime, offsetEllapsedTime} = $props();


    let milliSecondTiming = $derived.by(
        () => {

            let t = ellapsedTime;

            if (applicationState === 'paused') {
                t = offsetEllapsedTime;
            }

            return t;
        }
    );

    let completionRate = $derived(((milliSecondTiming / 1000) % poseDuration) / poseDuration);
</script>

<div class="timing-bar" style="width:{completionRate * 400}px"></div>

<style>
    .timing-bar {
        background: #fff;
        height: 2px;
    }
</style>
