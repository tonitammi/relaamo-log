<script lang="ts">
  import { onMount, tick } from "svelte";
  import Button from "./Button.svelte";

  export let tabTitles: string[] = [];

  let tabsContainer: HTMLDivElement;
  let tabs: HTMLElement[];
  let tabIndex: number = 0;

  const getTabs = () => {
    const children = tabsContainer.children;
    const htmlElements: HTMLElement[] = [];

    [...children].forEach(c => {
      const el = c as HTMLElement;
      if(!el.dataset.buttons) {
        htmlElements.push(el);    
      }
    });

    return htmlElements;
  }

  const hideAll = () => {
    tabs.forEach(tab => tab.style.display = "none"); 
  }

  const showTab = (index: number) => {
    if(!tabs) return;

    tabIndex = index;
    hideAll();

    tabs.forEach((tab, i) => {
      if(i === index) tab.style.display = "block";
    });
  }

  onMount(async () => {
    await tick();
    tabs = getTabs();
    showTab(0);
  });
</script>

<div class="tabs" bind:this={tabsContainer}>
  <!-- <div class="buttons" data-buttons="true">
    {#each tabTitles as title, i}
      <Button size="small" disabled={tabIndex === i} on:click={() => showTab(i)}>
        {title}
      </Button>
    {/each}
  </div> -->

  <slot />
</div>

<style>
  .buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
  }
</style>