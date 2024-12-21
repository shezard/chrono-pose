<script lang="ts">
    import 'mono-icons/iconfont/icons.css';

    import '../app.postcss';
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

{@render children?.()}
