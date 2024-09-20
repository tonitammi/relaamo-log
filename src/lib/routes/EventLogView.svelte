<script lang="ts">
  import type { EventLogData } from "../types/data";
  import { pageTitle } from "../scripts/stores";
  import { getEventLogData } from "../scripts/data";
  import { pushToDb, setToDb, getFromDb } from "../scripts/db";
  import { push } from "svelte-spa-router";
  import { createToast } from "../components/toast";

  import Input from "../components/shared/Input.svelte";
  import Button from "../components/shared/Button.svelte";
  import DatePicker from "../components/datetime/DatePicker.svelte";
  import { onMount } from "svelte";

  export let params: { editKey?: string };

  $pageTitle = "Luo tapahtumakirjaus";
  
  let data: EventLogData = getEventLogData();
  let initialDate = data.date as Date;
  let loading: boolean = true;

  const save = async () => {
    data.date = (data.date as Date).toISOString();
    const { status, msg } = await pushToDb("funteeraamo/events/", data);

    if(status) {
      createToast("Tapahtumakirjaus tallennettu onnistuneesti", 6000);
      data = getEventLogData();
      push("/kirjaukset/events");
    }
    else {
      data.date = new Date(data.date);
      createToast("Jotain meni pieleen: " + msg);
    }
  } 

  const update = async () => {
    if(typeof data.date !== "string") {
      data.date = (data.date as Date).toISOString();
    }

    const { status, msg } = await setToDb(`funteeraamo/events/${params.editKey}`, data);
    if(status) {
      createToast("Tapahtumakirjausta muokattu onnistuneesti", 6000);
      data = getEventLogData();
      push("/kirjaukset/events");
    }
    else {
      data.date = new Date(data.date);
      createToast("Jotain meni pieleen: " + msg);
    }
  }

  const sendData = async () => {
    if(params.editKey) update();
    else save();
  }

  onMount(async () => {
    if(!params.editKey) return loading = false;

    const eventData = await getFromDb<EventLogData>(`funteeraamo/events/${params.editKey}`);
    
      if(!eventData) {
      return alert("Muokattavaa kohdetta ei löytynyt tällä ID:llä");
    }

    data = eventData;
    initialDate = new Date(data.date);
    loading = false;
  })
</script>


<div class="form">
  <h3>
    {params.editKey ? "Muokkaa tapahtumakirjausta" : "Luo tapahtumakirjaus"}
  </h3>

  {#if !loading}
    <DatePicker initialValue={initialDate} bind:dateValue={data.date} />

    <Input bind:value={data.name} label="Tilaisuuden nimi" required={true} type="text" direction="column" />
    <Input bind:value={data.city} label="Tapahtuman paikkakunta" type="text" direction="column" />
    <Input bind:value={data.amount} label="Osallistujien määrä" required={true} type="number" direction="row" />

    <Button on:click={sendData}>Tallenna</Button>
  {/if}
</div>


<style>
  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 20rem;
    max-width: 95%;
    margin: 2rem auto;
    padding-bottom: 3rem;
  }
</style>
