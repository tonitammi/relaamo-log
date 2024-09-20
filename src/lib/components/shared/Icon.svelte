<script lang="ts">
  export let name: string = "";
  export let size: string = "inherit";
  export let style: string = "";
</script>

<span class="material-symbols-outlined" style="{style}; font-size: {size}px;">
  {name}
</span>