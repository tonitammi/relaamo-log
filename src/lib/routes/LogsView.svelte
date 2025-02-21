<script lang="ts">
  import type { EventLogData, LogData } from "../types/data";
  import { createListener } from "../scripts/db";
  import { onMount } from "svelte";
  import { pageTitle } from "../scripts/stores";
  import LogPreview from "../components/logs/LogPreview.svelte";
  import EventLogPreview from "../components/logs/EventLogPreview.svelte";
  import FilterBar from "../components/search/FilterBar.svelte";
  import { push } from "svelte-spa-router";

  export let params: { tab: "events" | "logs" |undefined };

  let tabToShow: "events" | "logs" = params.tab || "logs";

  let logs: LogData[] = []; 
  let events: EventLogData[] = [];

  let loading: boolean = true;
  let loadingEvents: boolean = true;

  $: logsToShow = logs;
  $pageTitle = "Selaa kirjauksia";

  const handleTabChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    tabToShow = select.value as "events" | "logs";
    push("/kirjaukset/" + tabToShow);
  }

  onMount(() => {
    const unsubscribe = createListener<LogData>("funteeraamo/logs", (data) => {
      logs = data;
      loading = false;
    });

    const unsubscribeEvents = createListener<EventLogData>("funteeraamo/events", (data) => {
      events = data;
      loadingEvents = false;
    });

    setTimeout(() => {
      loading = false;
      loadingEvents = false;
    }, 2000);

    return () => {
      unsubscribe();
      unsubscribeEvents();
    }
  });
</script>

<div class="logs">
  <h1>Kirjaukset</h1>

  <h5>Näytä:</h5>

  <select on:change={handleTabChange}>
    <option value="logs">Asiakastapaamiset</option>
    <option value="events">Tapahtumat</option>
  </select>

  <FilterBar 
    data={logs} 
    filterData={logsToShow} 
    currentTab={tabToShow}
    on:search={(e) => logsToShow = e.detail.result} 
  />

  {#if loading || loadingEvents}
    <p>Ladataan kirjauksia...</p>
  {/if}

  {#if tabToShow === "logs"}
    {#if logsToShow.length === 0}
      <p>Ei näytettäviä kirjauksia</p>
    {/if}
    {#each logsToShow as log (log.key)}
      <LogPreview data={log} />
    {/each}
  {:else}
    {#each events as event}
      <EventLogPreview data={event} />
    {/each}
  {/if}
</div>

<style>
  .logs {
    position: relative;
    width: 720px;
    max-width: 97.5%;
    margin: 0 auto;
  }
  h5 {
    margin-bottom: .5rem;
  }
  select {
    margin-bottom: 2rem;
  }
</style>