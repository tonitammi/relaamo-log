<script lang="ts">
  import type { LogData } from "../../types/data";
  import { getFollowUps } from "../../scripts/summary";
  import Table from "../shared/Table.svelte";

  export let data: LogData[] = [];
  let followUpData = getFollowUps(data);
</script>

<div>
  <Table 
    data={followUpData}
    title="Jatkoon ohjaus"
    tableTitles={["Paikka", "Määrä"]}
    keys={["label", "amount"]}
  />

</div>