<script lang="ts">
  import type { EventLogData, LogData } from "../../types/data";
  import { createEventDispatcher } from "svelte";
  import { cities } from "../../scripts/data";
  import DatePicker from "../datetime/DatePicker.svelte";
  import Button from "../shared/Button.svelte";
  import { searchByCity, searchByDate } from "../../scripts/data-filtering";
  import FilterTag from "./FilterTag.svelte";
  import Icon from "../shared/Icon.svelte";

  export let data: LogData[] | EventLogData[];
  export let filterData: LogData[] | EventLogData[];
  export let show: boolean = false;
  export let currentTab: "events" | "logs";

  const dispatch = createEventDispatcher();

  let date: Date;
  let city: string = "Pori";
  let filters: {label: string, data: LogData[] | EventLogData[]}[] = [];

  const dateSearch = () => {
    const backUpData = structuredClone(filterData);
    filters = [...filters, { 
      label: date.toLocaleDateString(), 
      data: backUpData
    }];

    const result = searchByDate(filterData, date);
    dispatch("search", { result });
    
  } 

  const citySearch = () => {
    const backUpData = structuredClone(filterData);
    filters = [...filters, { 
      label: city, 
      data: backUpData
    }];

    console.log(filters);

    const result = searchByCity(filterData, city);
    dispatch("search", { result });
  }

  const clearFilter = 
  (e: CustomEvent<{label: string, data: LogData[] | EventLogData[]}>) => {
    const d = e.detail;
    filters = filters.filter(x => x.label !== d.label);
    
    if(filters.length === 0) {
      return dispatch("search", { result: data })
    }
    dispatch("search", { result: d.data });
  }

  const clearAll = () => {
    dispatch("search", { result: data });
    filters = [];
  }
  const toggleShow = () => show = !show;

</script>

<div class="filter-bar">
  <Button size="small" on:click={toggleShow} disabled={currentTab === "events"}>
    <Icon name="filter_list" />
    {show ? "Piilota valikko" : "Suodata"}
  </Button>

  {#if show}
    {#if currentTab === "events"}
      <h4>HUOM! Suodatus ei toimi vielä tapahtumissa</h4>
    {/if}

    <h4>Suodata päivämäärän mukaan</h4>
    <div class="inputs">
      <DatePicker bind:dateValue={date} />
      <Button 
        size="small" 
        oneLine={true} 
        on:click={dateSearch}
        >
          Lisää suodatin
        </Button>
    </div>

    <h4>Suodata kaupungin mukaan</h4>
    <div class="inputs">
      <select bind:value={city}>
        {#each cities as c}
          <option value={c}>{c}</option>
        {/each}
      </select>
      <Button 
        size="small" 
        oneLine={true} 
        on:click={citySearch}
      >
        Lisää suodatin
      </Button>
    </div>
  {/if}

  {#if filters.length > 0}  
    <h4>Suodattimet:</h4>

    <div class="filter-tags">
      {#each filters as filter}
        <FilterTag 
          label={filter.label} 
          dataBefore={filter.data} 
          on:remove={clearFilter}
        />
      {/each}
    </div>

    <p>
      Näytetään: {filterData.length} tulosta
    </p>
  {/if}
</div>

<style>
  .filter-bar {
    margin-bottom: 1.5rem;
  }

  .inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 295px;
    max-width: 95%;
  }

  .filter-tags {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    margin-bottom: 1rem;
  }
</style>