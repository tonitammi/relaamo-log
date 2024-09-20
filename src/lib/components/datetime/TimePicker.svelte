<script lang="ts">
	import { onMount } from "svelte";
  import { getInitialValue } from "./utils";

  export let label: string = "";
  export let name: string = "id";
  export let value: Date | string = new Date();
  export let timeValue: number | null = null;
  export let direction: "row" | "column" = "column";
  export let dateValue: Date | string | null = null;

  let initialValue: string = "";

  if(typeof dateValue === "string") {
    dateValue = new Date(dateValue);
  }

  $: if(dateValue && timeValue) recalculateTime();

  const recalculateTime = () => {
    if(!dateValue || typeof dateValue === "string") return;
    const d = new Date(timeValue as number);
    
    (dateValue as Date).setHours(d.getHours());
    (dateValue as Date).setMinutes(d.getMinutes());
    (dateValue as Date).setSeconds(0);

    timeValue = (dateValue as Date).getTime();
  }
  
  const setTime = (d: Date, val: string): void => {
    const times = val.split(":");

    d.setFullYear(d.getFullYear());
    d.setMonth(d.getMonth());
    d.setDate(d.getDate());
    d.setHours(Number(times[0]));
    d.setMinutes(Number(times[1]));
    d.setSeconds(0);

    timeValue = d.getTime();
  }

  const handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const date = dateValue as Date || new Date();

    console.log("date", date);
  
    setTime(date, target.value);
  }

  onMount(() => {
    initialValue = getInitialValue(value);

    if(initialValue) setTime(new Date(), initialValue);
  });

</script>

<div style="--direction: {direction}" class="form-field">
  <label for={name}>{label}</label>
  <input id={name} type="time" value={initialValue} on:input={handleInput} />
</div>

<style>

</style>