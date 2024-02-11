<script>
    import Chrono from '$lib/components/Chrono.svelte';
    import TimingBar from '$lib/components/TimingBar.svelte';
    import Subject from '$lib/components/Subject.svelte';
    import Menu from '$lib/components/Menu.svelte';
</script>

<div class="w-screen flex justify-center">
    <div class="columns-1 flex flex-col justify-center w-screen overflow-y-hidden">
        <header>
            <Menu />
            <Subject />
            <TimingBar />
        </header>
        <Chrono />
    </div>
</div>
