<script lang="ts">
  export let title: string = "";
  export let tableTitles: string[] = [];
  export let data: any[] = [];
  export let keys: string[] = [];
</script>

<div>
  <h3>{title}</h3>
  {#if data}
    <table>
      <tr>
        {#each tableTitles as t}
          <th>{t}</th>
        {/each}
      </tr>
      {#each data as d}
        <tr>
          {#each keys as key}
            <td>{d[key]}</td>
          {/each}
        </tr>
      {/each}
    </table>
  {/if}
</div>


<style>
  table {
    border-color: gray;
    border-collapse: collapse;
    width: 19rem;
    max-width: 95%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .center {
    text-align: center;
  }
</style>