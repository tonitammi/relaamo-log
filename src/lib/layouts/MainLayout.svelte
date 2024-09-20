<script lang="ts">
  import AppBar from "../components/shared/AppBar.svelte";
  import { pageTitle } from "../scripts/stores";
</script>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>

<AppBar />
<main>
  <slot />
</main>

<style>
  main {
    padding: 1rem;
  }
</style>