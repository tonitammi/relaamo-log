<script lang="ts">
	import { onMount } from "svelte";

  export let label: string = "";
  export let name: string = "id";
  export let initialValue = new Date();
  export let dateValue: Date | string | null = null;
  export let direction: "row" | "column" = "column";

  let input: HTMLInputElement;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    dateValue = target.valueAsDate;
  }

  onMount(() => {
    if(!dateValue) {
      input.valueAsDate = initialValue;
      dateValue = initialValue;
    }
    else {
      input.valueAsDate = new Date(dateValue);
    }
  });
</script>

<div style="--direction: {direction}" class="form-field">
  <label for={name}>{label}</label>
  <input id={name} type="date" bind:this={input} on:input={handleInput} />
</div>

<style>

</style>