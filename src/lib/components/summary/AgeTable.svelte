<script lang="ts">
  import Table from "../shared/Table.svelte";
  export let data: {range: string, amount: number}[];
</script>

<div>
  <Table 
    {data}
    title="Asiakkaiden ikäjakauma"
    tableTitles={["Ikäjakauma", "Määrä"]}
    keys={["range", "amount"]}
  />
</div>