<script lang="ts">
  import Table from "../shared/Table.svelte";
  import Tabs from "../shared/Tabs.svelte";
  import { Bar } from "../charts";

  export let data: {city: string, amount: number}[] = [];

  let chartData = {
    labels: Object.values(data).map(d => d.city),
    datasets: [
      {
        label: "Kävijöitä kunnittain",
        data: Object.values(data).map(d => d.amount),
        backgroundColor: [
          'rgba(255, 134,159,0.4)',
          'rgba(98,  182, 239,0.4)',
          'rgba(255, 218, 128,0.4)',
          'rgba(113, 205, 205,0.4)',
          'rgba(170, 128, 252,0.4)',
          'rgba(255, 177, 101,0.4)',
        ],
        borderWidth: 2,
        borderColor: [
          'rgba(255, 134, 159, 1)',
          'rgba(98,  182, 239, 1)',
          'rgba(255, 218, 128, 1)',
          'rgba(113, 205, 205, 1)',
          'rgba(170, 128, 252, 1)',
          'rgba(255, 177, 101, 1)',
        ],
      }
    ]
  }
</script>

<div>
  <Tabs tabTitles={["Taulukko", "Diagrammi"]}>
    <Table 
      {data}
      title="Asiakkaat asuinpaikkakunnittain" 
      tableTitles={["Paikkakunta", "Määrä"]}
      keys={["city", "amount"]}
    />
    <div>
      <Bar 
        data={chartData} 
        options={{ 
          responsive: true, 
          scales: { 
            y: { 
              beginAtZero: true, 
              ticks: { stepSize: 1 } 
            } 
          } 
        }} 
      />
    </div>
  </Tabs>
</div>
