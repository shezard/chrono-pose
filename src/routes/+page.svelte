<script>
    import Chrono from '$lib/components/Chrono.svelte';
    import TimingBar from '$lib/components/TimingBar.svelte';
    import Subject from '$lib/components/Subject.svelte';
    import Menu from '$lib/components/Menu.svelte';
</script>

<div class="w-full flex justify-center">
    <div class="columns-1 flex flex-col justify-center w-[400px] overflow-y-hidden">
        <header>
            <Menu />
            <Subject />
            <TimingBar />
        </header>
        <Chrono />
    </div>
</div>
