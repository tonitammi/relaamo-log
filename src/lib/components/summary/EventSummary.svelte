<script lang="ts">
  import { getEventCities, getTotalEventParticipants } from "../../scripts/summary";
  import type { EventLogData } from "../../types/data";

  export let data: EventLogData[] = [];

  getEventCities(data);

  let totalParticipants = getTotalEventParticipants(data);
  let totalEvents = data.length;
  let avgParticipants = Math.round(totalParticipants / totalEvents);
</script>

<div>
  <h3>Tapahtumat</h3>

  <p>
    <strong>Tapahtumia yhteensä:</strong>
    {totalEvents} kpl
  </p>

  <p>
    <strong>Osallistujia yhteensä:</strong>
    {totalParticipants} kpl
  </p>

  <p>
    <strong>Osallitujia per tapahtuma</strong>
    n. {avgParticipants} hlö/tapahtuma
  </p>
</div>

<style>
  p {
    border-bottom: 1px solid gray;
    padding-bottom: 0.5rem;
    margin-bottom: 0rem;
  }
</style>


