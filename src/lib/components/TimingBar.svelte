<script>
    import { completionRate } from "$lib/chronoStore";

</script>

<div class="timing-bar" style="width:{$completionRate * 400}px" />

<style>
    .timing-bar {
        background: #fff;
        height: 2px;
        transition: width 1s linear;
    }
</style>
