<script lang="ts">
  import type { LogData } from "../../types/data";
  import { getAgeDistribution, 
    getAvgDuration, 
    getMostPopularAgeRange, 
    getTotalCustomers,
    getMostPopularDay,
    getFollowUpPercents

  } from "../../scripts/summary";

  export let data: LogData[] = [];

  let ageRange: {range: string, amount: number}[] = getAgeDistribution(data);
  let mostPopularAgeRange = getMostPopularAgeRange(ageRange);
  let avgDuration: number = getAvgDuration(data);
  let avgCustomers: number = Math.round(getTotalCustomers(data) / data.length * 10) / 10;
  let mostPopularWeekDay: string = getMostPopularDay(data);
  let followUpPercents: number = getFollowUpPercents(data);

</script>

<div>
  <h3>Käyntitiedot</h3>

  <p>
    <strong>Käynnin kesto (ka.):</strong>
    n. {avgDuration} min
  </p>

  <p>
    <strong>Yleisin ikäryhmä:</strong>
    {mostPopularAgeRange.range} vuotta
  </p>

  <p>
    <strong>Asiakkaita per käynti (ka.):</strong>
    {avgCustomers.toString().replace(".", ",")} kpl
  </p>

  <p>
    <strong>Asiakkaista ohjattu eteenpäin:</strong>
    {followUpPercents}%
  </p>

  <p>
    <strong>Suosituin käyntipäivä:</strong>
    {mostPopularWeekDay} 
  </p>
</div>

<style>
  p {
    border-bottom: 1px solid gray;
    padding-bottom: 0.5rem;
    margin-bottom: 0rem;
  }
</style>
