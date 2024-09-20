<script lang="ts">
  import { pageTitle } from "../../scripts/stores";
  import { signOut } from "../auth/auth";
  import Icon from "./Icon.svelte";
  import { push } from "svelte-spa-router";
  
  $: mainPage = $pageTitle === "Etusivu";

  let openDropdown: boolean = false;

  const toggleDropdown = () => {
    openDropdown = !openDropdown;
  }
</script>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>

<div class="app-bar">
  <div class="left">
    <button class="bar-btn" on:click={() => push("/")} title="Etusivulle">
      <Icon name="home" />
    </button>
  
    {#if !mainPage}
      <button class="bar-btn" on:click={() => history.back()} title="Palaa edellisille sivulle">
        <Icon name="arrow_back" />
      </button>
    {/if}
  
    <h3>{$pageTitle}</h3>
  </div>

  <div class="right">
    <button class="bar-btn" on:click={toggleDropdown}>
      <Icon name="account_circle" />
    </button>
  </div>
</div>

{#if openDropdown}
  <div class="profile-dropdown">
    <h4>Käyttäjätiedot</h4>
    <button on:click={signOut}>
      <Icon name="logout" />
      Kirjaudu ulos
    </button>
  </div>
{/if}

<style>
  .app-bar {
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    height: 3.5rem;
    padding: .5rem .75rem;
    background: var(--primary);
    color: var(--primary-text);
    border-radius: 0;
    z-index: 100;
  }

  .app-bar h3 {
    margin: 0 .5rem;
  }

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .bar-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem;
    border: none;
    background: transparent;
    color: inherit;
    font-size: 1.2rem;
  }

  .profile-dropdown {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 16px;
    top: 3.6rem;
    right: .1rem;
    width: 14rem;
    max-width: 95%;
    padding: .75rem .5rem .25rem .5rem;
    background: #fff;
    border: 1px solid gray;
    border-radius: 8px;
    z-index: 100;
  }

  .profile-dropdown h4 {
    margin: 0;
  }

  .profile-dropdown button {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 1rem .75rem;
    background: transparent;
    font-size: .85rem;
    font-weight: 600;
    border: none;
    /* border-bottom: 1px solid gray; */
    text-transform: uppercase;
  }
</style>