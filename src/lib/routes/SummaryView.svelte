<script lang="ts">
  import type { LogData, EventLogData } from "../types/data";
  import { createListener, setToDb } from "../scripts/db";
  import { onMount } from "svelte";
  import { getAgeDistribution, getCityCustomers, getTargetGroupAmounts, getTotalCustomers, getTotalVisits } from "../scripts/summary";
  import AgeTable from "../components/summary/AgeTable.svelte";
  import CityTable from "../components/summary/CityTable.svelte";
  import { pageTitle } from "../scripts/stores";
  import Summary from "../components/summary/Summary.svelte";
  import Button from "../components/shared/Button.svelte";
  import EventSummary from "../components/summary/EventSummary.svelte";
  import VisitSummary from "../components/summary/VisitSummary.svelte";
  import SummaryCard from "../components/summary/SummaryCard.svelte";
  import LendingSummary from "../components/summary/LendingSummary.svelte";
  import ProductTable from "../components/summary/ProductTable.svelte";
  import FollowUpSummary from "../components/summary/FollowUpSummary.svelte";
  import EventTable from "../components/summary/EventTable.svelte";

  $pageTitle = "Yhteenveto";

  let logs: LogData[] = [];
  let events: EventLogData[] = [];

  let ageDistribution: {range: string, amount: number}[] = [];
  let cityDistribution: {city: string, amount: number}[] = [];

  $: if(logs) {
    ageDistribution = getAgeDistribution(logs);
    cityDistribution = getCityCustomers(logs);
  }

  // const addUsers = async () => {
  //   await setToDb(`users/Aut6EKc1SyP8Wa8pL47PVOEkVKg1`, {
  //     moderator: true
  //   });
  //   await setToDb(`users/P8Gkq1FANCPjLyERSTBDo0iCykY2`, {
  //     moderator: true
  //   });
  //   await setToDb(`users/wv39Ui5mEJWbN0lxxMiqtvt8EqJ2`, {
  //     moderator: true
  //   });
  // }

  onMount(() => {
    const unsubscribe = createListener<LogData>("/funteeraamo/logs", (data) => {
      logs = data;
    });

    const unsubscribeEvents = createListener<EventLogData>("/funteeraamo/events", (data) => {
      events = data;
    });

    return () =>  {
      unsubscribe();
      unsubscribeEvents();
    }
  })
</script>

<h2>Yhteenveto</h2>

<div class="container">
  {#if logs.length > 0}
    <SummaryCard>
      <Summary data={logs} />
    </SummaryCard>

    <SummaryCard>
      <VisitSummary data={logs} />
    </SummaryCard>

    <SummaryCard>
      <LendingSummary data={logs} />
    </SummaryCard>

    {#if events.length > 0}
      <SummaryCard>
        <EventSummary data={events} />
      </SummaryCard>
    {/if}
    
    <SummaryCard>
      <AgeTable data={ageDistribution} />
    </SummaryCard>

    <SummaryCard>
      <CityTable data={cityDistribution} />
    </SummaryCard>

    <SummaryCard>
      <ProductTable data={logs} />
    </SummaryCard>

    <SummaryCard>
      <FollowUpSummary data={logs} />
    </SummaryCard>

    <SummaryCard>
      <EventTable data={events} />
    </SummaryCard>
  {/if}
</div>

<style>
  h2 {
    position: relative;
    margin: 2rem auto;
    max-width: 840px;
  }
  .container {
    position: relative;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 64px;
    margin: 2rem auto;
    max-width: 840px;
  }

  @media screen and (max-width: 25rem) {
    .container {
      justify-content: center;
    }
  }
</style>