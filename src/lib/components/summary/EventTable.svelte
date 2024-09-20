<script lang="ts">
  import { getEventCities } from "../../scripts/summary";
  import type { EventLogData } from "../../types/data";
  import Table from "../shared/Table.svelte";

  export let data: EventLogData[] = [];
  $: eventData = getEventCities(data);

  console.log(eventData)

</script>


<Table 
  data={eventData}
  title="Tapahtumien määrä paikkakunnittain"
  tableTitles={["Paikkakunta", "Määrä"]}
  keys={["city", "amount"]}
/>