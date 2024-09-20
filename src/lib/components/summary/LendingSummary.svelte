<script lang="ts">
  import type { LogData } from "../../types/data";
  import { getTotalLendingAmount, getAvgProductsPerVisit, getProductCategoryAmounts, getMostPopularLendingCategory } from "../../scripts/summary";

  export let data: LogData[] = [];

  let totalLendingAmount: number = getTotalLendingAmount(data);
  let lendingPerVisit: number = getAvgProductsPerVisit(data);
  let mostPopularCategory: {label: string, amount: number} = getMostPopularLendingCategory(data);
  let categories: {label: string, amount: number}[] = getProductCategoryAmounts(data);
</script>

<div>
  <h3>Lainaustiedot</h3>

  <p>
    <strong>Lainattuja tuotteita yhteensä:</strong>
    {totalLendingAmount} kpl
  </p>

  <p>
    <strong>Käynnillä lainattu tuote:</strong>
    {Math.round(lendingPerVisit * 100)} %
  </p>

  <p>
    <strong>Suosituin apuvälinekategoria:</strong>
    {mostPopularCategory.label} ({mostPopularCategory.amount} kpl)
  </p>
</div>
  
<style>
  p {
    border-bottom: 1px solid gray;
    padding-bottom: 0.5rem;
    margin-bottom: 0rem;
  }
</style>

  