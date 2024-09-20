<script lang="ts">
  import Icon from "../shared/Icon.svelte";

  export let products: string[] = [];

  const clear = (index: number) => {
    products.splice(index, 1);
    products = products.length === 0 ? [""] : products;
  }
</script>

<ul>
  {#if products.length > 0 && products[0]}
    <h4>Lainatut välineet</h4>
  {/if}
  {#each products as product, i}
    {#if product}
      <li>
        {product} 
        <button on:click={() => clear(i)}><Icon name="clear" size="24" /></button>
      </li>
    {/if}
  {/each}
</ul>

<style>
  h4 {
    margin: 0 0 .5rem 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-left: .75rem;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  button {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
  }
</style>