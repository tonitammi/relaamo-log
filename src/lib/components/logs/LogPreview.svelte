<script lang="ts">
  import type { LendingKey, LogData } from "../../types/data";
  import { getSubjectsString } from "../../scripts/data-formatting";
  import { deleteFromDb } from "../../scripts/db";
  import { getTimeString } from "../datetime/utils";
  import { createToast } from "../toast";
  import Button from "../shared/Button.svelte";
  import Icon from "../shared/Icon.svelte";
  import { onMount } from "svelte";
  import { getFinnishLendingCategory } from "../../scripts/data";

  export let data: LogData;

  let startTime: string = getTimeString(data.startTime);
  let endTime: string = getTimeString(data.endTime);

  let showLendInfo: boolean = false;
  let lendCategories: string[] = [];
  let lendProducts: string[] = [];

  const removeLog = async () => {
    const check = confirm("Haluatko varmasti poistaa tämän merkinnän? Merkintää ei voi enää palautaa");
    if(!check) return;

    const { status, msg } = await deleteFromDb(`funteeraamo/logs/${data.key}`);
    if(!status) return alert("Poistamisessa tapahtui virhe: " + msg);
    createToast("Merkintä poistettu", 6000);
  }

  onMount(() => {
    const categories: string[] = [];
    const products: string[] = [];

    if(data.productLending.done) {
      for(const key in data.productLending.details) {
        if(data.productLending.details[key as LendingKey].amount > 0) {
          categories.push(getFinnishLendingCategory(key));

          if(!data.productLending.details[key as LendingKey].products) return;
          
          (data.productLending.details[key as LendingKey].products as string[]).forEach(p => {
            if(p) products.push(p);
          })
        }
      }

      lendCategories = categories;
      lendProducts = products;
    }
  })
</script>

<div class="log-preview">
  <p>
    {new Date(data.date).toLocaleDateString()}
    klo {startTime} - {endTime}</p>
  <p><strong>Ikä:</strong> {data.age} vuotta</p>
  <p><strong>Asuinpaikkakunta:</strong> {data.city}</p>
  <p><strong>Ohjauksen aihe:</strong> { getSubjectsString(data) }</p>
  <p><strong>Apuväline lainattu:</strong> {data.productLending.done ? "Kyllä" : "Ei"}</p>
  
  {#if data.productLending.done}
    <Button size="small" mode="clear" style="padding-left: 0;" on:click={() => showLendInfo = !showLendInfo}>
      {showLendInfo ? "Piilota" : "Näytä apuvälineet"}
      <Icon name={showLendInfo ? "expand_less" : "expand_more"} size="22" />
    </Button>
    {#if showLendInfo}
      <p>
        <strong>Lainaus kategoriat:</strong> {lendCategories.join(", ")}
      </p>
      <p>
        <strong>Lainatut tuotteet:</strong> {lendProducts.join(", ")}
      </p>
    {/if}
  {/if}

  <div class="right">
    <Button size="small" mode="warning" on:click={removeLog}>
      <Icon name="clear" size="20" />
      Poista
    </Button>
    <Button size="small" href="/#/luo-kirjaus/{data.key}">
      <Icon name="edit" size="20" />
      Muokkaa kirjausta
    </Button>
  </div>
</div>

<style>
  .log-preview {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 1rem;
    max-width: 520px;
    padding: .75rem;
    background: #fff;
    border: 1px solid var(--primary);
    border-radius: 8px;
  }
  p {
    margin: 0;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
  }
</style>