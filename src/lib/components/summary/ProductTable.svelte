<script lang="ts">
  import type { LogData } from "../../types/data";
  import { getProductCategoryAmounts } from "../../scripts/summary";
  import Table from "../shared/Table.svelte";

  export let data: LogData[] = [];
  let productData = getProductCategoryAmounts(data);
</script>

<Table
  data={productData}
  title="Tuotalainausten määrä" 
  tableTitles={["Tuotekategoria", "Määrä"]}
  keys={["label", "amount"]}
/>