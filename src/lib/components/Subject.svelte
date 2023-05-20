<script lang="ts">
    import { id } from '$lib/imageStore';
    import { state } from '$lib/chronoStore';
</script>

<div class="w-[400px] py-2">
    <img
        style={$state === 'paused' ? 'filter:blur(50px)' : ''}
        src="https://images.unsplash.com/photo-{$id}?w=400&q=80"
        alt=""
    />
</div>
