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
  let eventData: EventObject | null = null;
  let logHTML: string = "";
  let eventHTML: string = "";

  onMount(async () => {
    try {
      data = await loadLogsObject();
      eventData = await loadEventsObject();
      if(!data || !eventData) return alert("Dataa ei voitu ladata tietokannasta");

      logHTML = createDownloadHTML(data);
      eventHTML = createDownloadHTML(eventData, "event");
    }
    catch(err) {
      console.log(err);
      // alert("Virhe ladatessa tietoja");
      
    }
  });
</script>

<div style="margin: 1rem auto">
  <h2>Lataa data</h2>

  <h4>Käyntikirjaukset</h4>
  {@html logHTML}

  <h4>Tapahtukirjaukset</h4>
  {@html eventHTML}
  <!-- <Button on:click={download}>Lataa json</Button> -->
</div>