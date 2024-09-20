<script lang="ts">
  import { fly } from "svelte/transition";
  import { doNotShow } from "../../scripts/updates";
  import Icon from "./Icon.svelte";
  
  export let title: string = "";
  export let text: string = "";
  export let show: boolean = true;
</script>

{#if show}
  <div class="info-bar" role="dialog" transition:fly={{duration: 200, y: -100}}>
    <div class="title-container">
      <h4>{title}</h4>
      <button on:click={doNotShow}>
        <Icon name="close" />
      </button>
    </div>
    <p>{@html text}</p>
  </div>
{/if}

<style>
  .info-bar {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 520px;
    max-width: 100%;
    padding: .5rem 1rem;
    background: #333;
    color: #fff;
    border-radius: 8px;
    z-index: 1000;
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 0;
  }

  .title-container button {
    background: transparent;
    color: #f2f2f2;
    border: none;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 0;
  }

  p {
    margin-top: .5rem;
    margin-bottom: 0;
  }
</style>