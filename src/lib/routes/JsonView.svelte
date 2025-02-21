<script lang="ts">
  import { onMount } from "svelte";
  import { 
    loadLogsObject, 
    loadEventsObject,
    createDownloadHTML, 
    type LogObject, 
    type EventObject 
  } from "../scripts/json";

  let data: LogObject | null = null;
  let loading: boolean = true;
  let error: string = "";

  let eventData: EventObject | null = null;
  let logHTML: string = "";
  let eventHTML: string = "";

  let eventLength: number;
  let logLength: number;
  let lastLogDate: string | undefined;
  let lastEvenLogDate: string | undefined; 

  const getLast = (obj: LogObject | EventObject) => {
    const keys = Object.keys(obj);
    const key = keys[keys.length - 1];
    const lastLog = obj[key];

    if(lastLog.date) {
      return new Date(lastLog.date).toLocaleDateString();
    }

    return "-";
  }

  const getLength = (obj: LogObject | EventObject) => {
    return Object.keys(obj).length;
  }

  onMount(async () => {
    try {
      data = await loadLogsObject();
      eventData = await loadEventsObject();

      if(!data || !eventData) {
        throw Error("Dataa tai osaa siitä ei voitu ladata tietokannasta");
      }

      lastLogDate = getLast(data);
      lastEvenLogDate = getLast(eventData);

      logLength = getLength(data);
      eventLength = getLength(eventData);

      logHTML = createDownloadHTML(data);
      eventHTML = createDownloadHTML(eventData, "event");
    } catch(err) {
      error = (err as Error).message;      
    } finally {
      loading = false;
    }
  });
</script>

<div style="margin: 1rem auto">
  <h2>Export data</h2>

  <h4>Käyntikirjaukset</h4>
  {#if !loading}
    <p>
      Kirjauksia yht: {logLength} <br />
      Viimeisin kirjaus: {lastLogDate}
    </p>
  {:else}
    <p>Ladataan tietoja...</p>
  {/if}
  {@html logHTML}

  <h4>Tapahtukirjaukset</h4>
  {#if !loading}
    <p>
      Kirjauksia yht: {eventLength} <br />
      Viimeisin kirjaus: {lastEvenLogDate}
    </p>
  {:else}
    <p>Ladataan tietoja...</p>
  {/if}
  {@html eventHTML}
  <!-- <Button on:click={download}>Lataa json</Button> -->
</div>