<script>
    import { completionRate } from '$lib/store';
</script>

<div class="timing-bar" style="width:{$completionRate * 400}px" />

<style>
    .timing-bar {
        background: #fff;
        height: 2px;
    }
</style>
