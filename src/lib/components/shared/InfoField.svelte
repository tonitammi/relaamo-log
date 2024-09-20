<script lang="ts">
  import Icon from "./Icon.svelte";

  export let hide: boolean = false;
</script>

  <div>
    <div class="top">
      <h4>
        <Icon name="info" style="vertical-align: middle; color: var(--accent);" />
        Lisätietoja
      </h4>
      {#if !hide}
        <button class="close" title="Sulje ohje" on:click={() => hide = true}>
          <Icon name="close" />
        </button>
      {:else}
        <button class="open" on:click={() => hide = false}>Näytä ohje</button>
      {/if}
    </div>

    {#if !hide}
      <p class="info"><slot /></p>
    {/if}
  </div>


<style>
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  h4 {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: .2rem;
    margin-bottom: 0;
  }
  
  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    color: #333;
    border: none;
    font-size: 1.3rem;
    font-weight: 600;
  }
  
  .open {
    background: transparent;
    color: var(--accent);
    border: none;
    font-weight: 600;
  }

  .info {
    margin-top: 0;
    padding: .5rem;
    background: #fff;
    color: rgb(39, 39, 39);
    font-size: .9rem;
    border: 1.5px solid var(--secondary);
    border-radius: 8px;
  }
</style>