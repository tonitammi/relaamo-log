<script lang="ts">
    import type { EventLogData } from "../../types/data";

    import { deleteFromDb } from "../../scripts/db";
    import { createToast } from "../toast";
    import Button from "../shared/Button.svelte";
    import Icon from "../shared/Icon.svelte";
  
    export let data: EventLogData;
  
    const removeLog = async () => {
      const check = confirm("Haluatko varmasti poistaa tämän merkinnän? Merkintää ei voi enää palautaa");
      if(!check) return;
  
      const { status, msg } = await deleteFromDb(`funteeraamo/events/${data.key}`);
      if(!status) return alert("Poistamisessa tapahtui virhe: " + msg);
      createToast("Merkintä poistettu", 6000);
    }
  </script>
  
  <div class="log-preview">
    <p>
      {new Date(data.date).toLocaleDateString()}
    <p>

    <p><strong>Tilaisuuden nimi:</strong> {data.name}</p>
    <p><strong>Paikkakunta:</strong> {data.city}</p>
    <p><strong>Osallistujamäärä:</strong> {data.amount}</p>
    
    <div class="right">
      <Button size="small" mode="warning" on:click={removeLog}>
        <Icon name="clear" size="20" />
        Poista
      </Button>
      <Button href="/#/luo-tapahtuma-kirjaus/{data.key}" size="small">
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
      max-width: 520px;
      margin-bottom: 1rem;
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