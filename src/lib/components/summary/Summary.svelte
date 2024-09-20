<script lang="ts">
  import type { LogData } from "../../types/data";
  import { parseMsToTime, getTimeString } from "../datetime/utils";
  import { getTotalCustomers, getTotalVisits, getTotalDuration } from "../../scripts/summary";

  export let data: LogData[] = [];

  let visits = data.length;
  let totalVisits: number = getTotalVisits(data);
  let totalCustomers: number = getTotalCustomers(data);
  let totalDuration: string = parseMsToTime(getTotalDuration(data));
  let lastLogDate: Date = new Date(data[0].date);

</script>

<div>
  <h3>Yleiskatsaus</h3>

  <p>
    <strong>Käyntikertoja:</strong>
    {visits} kpl
  </p>

  <p>
    <strong>Kävijöitä yhteensä:</strong>
    {totalVisits} kpl
  </p>

  <p>
    <strong>Asiakkaita yhteensä:</strong>
    {totalCustomers} kpl
  </p>

  <p>
    <strong>Käyntien kokonaiskesto:</strong>
    {totalDuration} 
  </p>

  <p>
    <strong>Viimeisin käynti:</strong>
    {lastLogDate.toLocaleDateString()} klo {getTimeString(data[0].startTime)} 
  </p>

</div>

<style>
  p {
    border-bottom: 1px solid gray;
    padding-bottom: 0.5rem;
    margin-bottom: 0rem;
  }
</style>
