<script lang="ts">
  export let marginY: number = 12;
  export let color: string = "gray";
</script>

<div class="hr" style="--marginY: {marginY}px; --color: {color}"></div>

<style>
  .hr {
    border-bottom: 1.5px solid #e0e0e0;
    margin-top: var(--marginY);
    margin-bottom: var(--marginY);
  }
</style>
