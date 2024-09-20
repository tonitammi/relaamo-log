<script lang="ts">
  import type { LogData, TargetKey, SubjectKey, LendingKey } from "../types/data";
  import { onMount } from "svelte";
  import { followUpPlaces, lendProducts, pageTitle } from "../scripts/stores";
  import { ageRanges, cities, placeOfGuidance, targetGroup, subjectOfGuidance, getLogData } from "../scripts/data";
  import { validateLogData } from "../scripts/validation";
  import { pushToDb, getFromDb, setToDb } from "../scripts/db";
  import { formatData } from "../scripts/data-formatting";

  import DateTimeField from "../components/datetime/DateTimeField.svelte";
  import Hr from "../components/shared/Hr.svelte";
  import InfoField from "../components/shared/InfoField.svelte";
  import Input from "../components/shared/Input.svelte";
  import Button from "../components/shared/Button.svelte";
  import { push } from "svelte-spa-router";
  import { createToast } from "../components/toast";
  import Icon from "../components/shared/Icon.svelte";
  import ProductsList from "../components/logs/ProductsList.svelte";

  export let params: { editKey?: string };

  let editMode: boolean = params.editKey ? true : false;
  let editKey: string = params.editKey || "";
  let loading: boolean = true;

  $pageTitle = editMode ? "Muokkaa kirjausta" : "Luo kirjaus";

  let data: LogData = getLogData();
  let errors: string[] = [];
  let loadError: string = "";

  let totalProducts = 0;
  let product = {
    hearing: "",
    vision: "",
    memory: "",
    safety: "",
    other: ""
  }

  let products: {[k: string] : string[]} = {
    hearing: [""],
    vision: [""],
    memory: [""],
    safety: [""],
    other: [""]
  }

  $: if(products) console.log(products)

  $: if(data) {
    console.log(data);
  }

  $: if(data.productLending.done) {
    let { details } = data.productLending;
    totalProducts = 0;
    
    for(const key in details) {
      totalProducts += details[key as LendingKey].amount;
    }
  }

  const addToProducts = (key: LendingKey) => {
    const val = product[key];
    if(val.length < 2) return;

    products[key] = [...products[key], val];
    product[key] = "";
  }

  const addProductsToData = (data: LogData) => {
    const clone = structuredClone(data);

    for(const key in clone.productLending.details) {
      let detail = clone.productLending.details[key as LendingKey];
      detail.products = products[key as LendingKey];
    }
    console.log(clone);
    return clone;
  } 

  const getTargetKey = (key: string) => key as TargetKey;
  const getSubjectKey = (key: string) => key as SubjectKey; 

  const saveLogData = async () => {
    const { 
      status: validationStatus, 
      errors: saveErrors 
    } = validateLogData(data);
    
    if(!validationStatus) return errors = saveErrors;    
    
    const dataWithProducts = addProductsToData(data);
    const formattedData = formatData(dataWithProducts);

    if(!editMode) {
      const { status, msg } = await pushToDb<LogData>("funteeraamo/logs", formattedData);
      if(!status) return loadError = msg;
      push("/");
      createToast("Kirjaus luotu onnistuneesti", 6000);
    }
    else {
      const { status, msg } = await setToDb<LogData>(`funteeraamo/logs/${editKey}`, formattedData);
      if(!status) return loadError = msg;
      push("/kirjaukset");
      createToast("Muokkaukset tallennettu onnistuneesti", 6000);
    }
  } 

  onMount(async () => {
    if(!editMode) return loading = false;

    const logData = await getFromDb<LogData>(`funteeraamo/logs/${editKey}`);
    
    if(!logData) {
      loading = false;
      return alert("Muokattavaa merkintää ei löytynyt");
    }
    
    data = logData;
    
    for(const key in logData.productLending.details) {
      let details = logData.productLending.details;
      let p = details[key as LendingKey].products;
      products[key as LendingKey] = p ? p as string[] : [""];
    }

    loading = false;
  });

</script>

<div class="form"> 
  <h4>
    <Icon name="schedule" />
    Ajankohta
  </h4>

  {#if !loading}
    <DateTimeField 
      bind:startTime={data.startTime} 
      bind:endTime={data.endTime} 
      bind:dateValue={data.date} 
      manualTime={editMode}
      {editMode}
    />

    <Hr />

    <h4>
      <Icon name="person" />
      Asiakkaan tiedot
    </h4>
    <div class="form-field">
      <label for="city">Asiakkaan asuinkunta</label>
      <select id="city" bind:value={data.city}>
        {#each cities as city}
          <option value={city}>{city}</option>
        {/each}
      </select>
    </div>

    <div class="form-field">
      <label for="age">Asiakkaan ikä</label>
      <select id="age" bind:value={data.age}>
        {#each ageRanges as range}
          <option value={range}>{range}</option>
        {/each}
      </select>
    </div>

    <Hr />

    <h4>
      <Icon name="support_agent" />
      Ohjaus ja neuvonta
    </h4>

    <div class="form-field">
      <label for="place">Ohjausta annettu</label>
      <select id="place" bind:value={data.place}>
        {#each placeOfGuidance as {label, value}}
          <option {value}>{label}</option>
        {/each}
      </select>
    </div>
  
    <div class="form-field">
      <label for="amounts" class="bold">Asiakkaiden määrä *</label>
      <div id="amounts">
        {#each targetGroup as { label, key }}
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label style="display: flex; justify-content: space-between; align-items: center; gap: 4px; margin-bottom: 8px; width: 100%;">
            {label}
            <Input  
              type="number" 
              bind:value={data.targetGroup[getTargetKey(key)].amount} 
            />
          </label>
        {/each}
      </div>
    </div>
    
    <div class="form-field">
      <label for="subject" class="bold">Ohjauksen aihe *</label>
      <div id="subject">
        {#each subjectOfGuidance as {label, key}}
          <label style="display: flex; justify-content: space-between; align-items: center; gap: 4px;">
            {label}
            <input type="checkbox" bind:checked={data.subject[getSubjectKey(key)]} />
          </label>
        {/each}
      </div>
    </div>

    <div class="form-field">
      <label for="a">Ohjattiin eteenpäin</label>
      <select id="a" bind:value={data.followUp.done}>
        <option value={true}>Kyllä</option>
        <option value={false}>Ei</option>
      </select>
    </div>

    {#if data.followUp.done}
      <div class="form-field">
        <Input 
          label="Mihin ohjattiin?" 
          placeholder="Esim. kuntoutusohjaajalle" 
          type="text" 
          direction="column"
          list="follow-up"
          datalist={$followUpPlaces}
          bind:value={data.followUp.place}
        />
      </div>
    {/if}

    <Hr />

    <h4>
      <Icon name="inventory" />
      Tuotelainaus
    </h4>

    <div class="form-field">
      <label for="b">Tuote lainattu</label>
      <select id="b" bind:value={data.productLending.done}>
        <option value={true}>Kyllä</option>
        <option value={false}>Ei</option>
      </select>
    </div>

    {#if data.productLending.done}
      <InfoField>
        Kirjoita lainattujen apuvälineiden määrä kategoriakohtaisesti (pakollinen). Voit listata myös 
        lainattujen apuvälineiden nimet tekstikenttään (vapaaehtoinen). Kirjoita kenttään yksi apuväline kerrallaan
        ja klikkaa lisää.
      </InfoField>

      <div class="small-gap">
        <Input 
          label="Näkemisen apuväline (kpl)" 
          type="number" 
          direction="row"
          required={true} 
          bind:value={data.productLending.details.vision.amount}
        />
        <div class="row">
          <Input 
            label="Näkemisen apuvälineet" 
            placeholder="Kirjoita apuvälineen nimi" 
            type="text" 
            direction="column"
            labelStyle="width: 100%;"
            list="vision-products"
            datalist={$lendProducts.vision}
            bind:value={product.vision}
          />
          <Button 
            size="small" 
            disabled={product.vision.length < 2}
            on:click={() => addToProducts("vision")}
          >
            Lisää
          </Button>
        </div>
        <ProductsList bind:products={products.vision} />
      </div>

      <Hr marginY={0} />
      
      <div class="small-gap">
        <Input 
          label="Kuulemisen apuväline (kpl)" 
          required={true} 
          type="number" 
          direction="row"
          bind:value={data.productLending.details.hearing.amount}  
        />
        <div class="row">
          <Input 
            label="Kuulemisen apuväline" 
            placeholder="Kirjoita apuvälineen nimi" 
            type="text" 
            direction="column"
            labelStyle="width: 100%;"
            list="hearing-products"
            datalist={$lendProducts.hearing}
            bind:value={product.hearing}
          />
          <Button 
            size="small" 
            disabled={product.hearing.length < 2}
            on:click={() => addToProducts("hearing")}
          >
            Lisää
          </Button>
        </div>
        <ProductsList bind:products={products.hearing} />

      </div>
      
      <Hr marginY={0} />
      
      <div class="small-gap">
        <Input 
          label="Turvallisuuden apuväline (kpl)" 
          required={true} 
          type="number" 
          direction="row"
          bind:value={data.productLending.details.safety.amount} 
        />
        <div class="row">
          <Input 
            label="Turvallisuuden apuväline" 
            placeholder="Kirjoita apuvälineen nimi" 
            type="text" 
            direction="column"
            labelStyle="width: 100%;"
            list="safety-products"
            datalist={$lendProducts.safety}
            bind:value={product.safety} 
          />
          <Button 
            size="small" 
            disabled={product.safety.length < 2}
            on:click={() => addToProducts("safety")}
          >
            Lisää
          </Button>
        </div>
        <ProductsList bind:products={products.safety} />

      </div>
      
      <Hr marginY={0} />
      
      <div class="small-gap">
        <Input 
          label="Muistin apuväline (kpl)" 
          required={true} 
          type="number" 
          direction="row"
          bind:value={data.productLending.details.memory.amount}  
        />
        <div class="row">
          <Input 
            label="Muistin apuväline" 
            placeholder="Kirjoita apuvälineen nimi" 
            type="text" 
            direction="column"
            labelStyle="width: 100%;"  
            list="memory-products"
            datalist={$lendProducts.memory}
            bind:value={product.memory}  
          />
          <Button 
            size="small" 
            disabled={product.memory.length < 2}
            on:click={() => addToProducts("memory")}
          >
            Lisää
          </Button>
        </div>
        <ProductsList bind:products={products.memory} />

      </div>

      <Hr marginY={0} />
      
      <div class="small-gap">
        <Input 
          label="Muu apuväline (kpl)" 
          required={true} 
          type="number" 
          direction="row"  
          bind:value={data.productLending.details.other.amount}
        />
        <div class="row">
          <Input 
            label="Muu, mikä?" 
            placeholder="Kirjoita apuvälineen nimi"
            type="text" 
            direction="column"   
            labelStyle="width: 100%;"
            list="other-products"
            datalist={$lendProducts.other}
            bind:value={product.other}
          />
          <Button 
            size="small" 
            disabled={product.other.length < 2}
            on:click={() => addToProducts("other")}
          >
            Lisää
          </Button>
        </div>
        <ProductsList bind:products={products.other} />
      </div>

      <label style="display: flex; justify-content: space-between; align-items: center; gap: 4px;">
        Lainattuja tuotteita yhteensä (kpl)
        <input style="width: 3rem;" class="center" type="number" value={totalProducts} disabled />
      </label>

    {/if}

    {#if errors.length > 0}
      <p>Kirjaustiedoissa on puutteita:</p>
      <ul>
        {#each errors as er} <li>{er}</li> {/each}
      </ul>
    {/if}

    {#if loadError}
      <p>Virhe: {loadError}</p>
    {/if}
    
    {#if !data.endTime}
      <p>Huom! Päätä käynti ennen kirjauksen luomista</p>
    {/if}
    <div class="buttons">
      {#if editMode}
        <Button mode="warning" on:click={() => push("/kirjaukset")}>Peruuta</Button>
      {/if}
      <Button disabled={!data.endTime} on:click={saveLogData}>
        { editMode ? "Tallenna muutokset" : "Luo kirjaus" }
      </Button>
    </div>

  {:else}
    <p>Ladataan sivua...</p>
  {/if}
</div>

<style>
  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 25rem;
    max-width: 100%;
    margin: 1rem auto 2rem auto;
    padding: 1rem .75rem 3rem .75rem;
    background: #f9f9f9;
    border: 1px solid var(--secondary);
    border-radius: 8px;
    box-shadow: 0 0 8px 1px rgba(63, 81, 181, 0.249)
  }

  .small-gap {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
    margin: 1rem auto;
  }

  h4 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    width: fit-content;
    margin-top: .5rem;
    margin-bottom: .5rem;
    padding: 0 .25rem .25rem 0;
    /* padding-bottom: .2rem; */
    border-bottom: 1.5px solid var(--primary);
  }

  .bold {
    font-weight: 600;
  }
  .center {
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-top: 2rem;
  }

  .row {
    display: flex;
    justify-content: stretch;
    align-items: flex-end;
    gap: 8px;
  }
</style>
  