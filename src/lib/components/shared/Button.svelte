<script lang="ts">
  export let href: string = "";
  export let type: "button" | "submit" = "button";
  export let mode: "primary" | "secondary" | "warning" | "clear" = "primary";
  export let size: "normal" | "small" = "normal";
  export let disabled: boolean | null = false;
  export let style: string = "";
  export let oneLine: boolean = false;
</script>

{#if href}
  <a 
    href={disabled ? "javascript:void(0)" : href} 
    class="{size} {oneLine ? "one-line" : ""} {disabled ? "disabled" : ""}" 
    style="background: var(--{mode}); color: var(--{mode}-text); {style}"
    title={disabled ? "Toiminto ei käytössä lukuoikeuksilla" : "Poista kirjaus"}
  >
    <slot />
  </a>
{:else}
  <button 
    class="{size} {oneLine ? "one-line" : ""}" 
    title={disabled ? "Toiminto ei käytössä lukuoikeuksilla" : "Muokkaa kirjausta"}
    {disabled} 
    {type} 
    on:click 
    style="background: var(--{mode}); color: var(--{mode}-text); {style}"
  >
    <slot />
  </button>
{/if}

<style>
  a {
    text-decoration: none;
  }

  a:visited {
    color: #fff;
  }

  a, button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: fit-content;
    border: none;
    padding: .75rem 1rem;
    border-radius: 8px;
  }

  a:disabled, button:disabled, .disabled  {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .small {
    padding: .5rem .75rem;
    border-radius: 6px;
  }

  .one-line {
    white-space: nowrap;
  }
</style>