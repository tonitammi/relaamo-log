<script lang="ts">
  import { exportCsv } from "../scripts/csv";
  import { pageTitle } from "../scripts/stores";

  $pageTitle = "Hae kirjausdata";

  let separator: "," | ";" = ";";
  let name: string = "";

  const exportData  = () => {
    const data = [
      ["sarake1", "sarake2", "sarake3"],
      ["arvo 1_1", "arvo 2_1", 3],
      ["arvo 1_2", "", 4],
    ];
    exportCsv({ data, separator, name });
  }
</script>


<label for="name">Tiedoston nimi</label>
<input id="name" bind:value={name} />

<label for="separator">Csv-tiedoston erotin (Suomenkielisessä Excelissä oletuksena puolipiste)</label>
<select id="separator" bind:value={separator}>
  <option value=",">, - Pilkku </option>
  <option value=";">; - Puolipiste</option>
</select>
<button on:click={exportData}>Lataa csv</button>