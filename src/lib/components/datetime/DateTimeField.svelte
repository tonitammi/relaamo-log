<script lang="ts">
  import Button from "../shared/Button.svelte";
  import DatePicker from "./DatePicker.svelte";
  import TimePicker from "./TimePicker.svelte";
  import { getTimeString } from "./utils";

  export let editMode: boolean = false;
  export let dateValue: Date | string | null = new Date();
  export let startTime: number | null = null;
  export let endTime: number | null = null;
  export let manualTime: boolean = false;


  let timerRunning: boolean = false;
  let timerReady: boolean = startTime && endTime ? true : false;

  $: startTimeStr = getTimeString(startTime);
  $: endTimeStr = getTimeString(endTime);

  const toggleLog = () => {
    if(timerReady) return;
    if(!timerRunning) return startLog();
    endLog();
  }

  const startLog = () => {
    startTime = new Date().getTime();
    timerRunning = true;
  }

  const endLog = () => {
    endTime = new Date().getTime();
    timerRunning = false;
    timerReady = true;
  }
</script>

{#if !manualTime}
  <Button size="small" on:click={() => manualTime = true} style="margin-bottom: 1rem;">Syötä ajat</Button>
{/if}

<DatePicker bind:dateValue name="date" label="Päivämäärä" />

{#if manualTime}
  <div class="small-gap">
    <TimePicker bind:dateValue bind:timeValue={startTime} name="startTime" value={startTime ? new Date(startTime) : ""} label="Aloitusaika" />
    <TimePicker bind:dateValue bind:timeValue={endTime} name="endTime" value={endTime ? new Date(endTime) : ""} label="Lopetusaika" />
    
    {#if !editMode}
      <Button size="small" on:click={() => manualTime = false} style="margin-top: 1rem;">Palaa kirjausnäkymään</Button>
    {/if}
  </div>
{:else}
  <div class="small-gap">
    <div style="font-size: .9rem; margin-top: .7rem;">
      Ajankohta: {startTimeStr} -  {endTimeStr}
    </div>

    <Button 
      style="position: sticky; top: 3.5rem; {timerRunning ? "background: orange; margin-top: 2rem;" : "margin-top: 2rem;"}"
      disabled={timerReady}
      on:click={toggleLog}
    >
      {timerRunning ? "Lopeta käynti" : "Aloita käynti"}
    </Button>
  </div>
{/if}