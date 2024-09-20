<script lang="ts">
  export let value: any;
  export let type: string = "text";
  export let label: string = "";
  export let placeholder: string = "";
  export let required: boolean = false;
  export let list: string = "";
  export let datalist: string[] = [];
  export let direction: "row" | "column" = "row";
  export let labelStyle: string = "";

  const inputStyle = type === "number" ? "width: 2.85rem; padding: 0rem .3rem; text-align: center;" : "";
  const lStyle = type === "number" ? `justify-content: space-between; ${labelStyle}` : labelStyle;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    
    if(type === "number") {
      return value = Number(target.value);
    }
    value = target.value;
  }
</script>

<label class="form-field" style="--direction: {direction}; {lStyle}">
  {label} {required ? "*" : ""}
  <input {list} {type} {value} {placeholder} style={inputStyle} min=0 on:input={handleInput} />
</label>

{#if datalist.length > 0}
  <datalist id={list}>
    {#each datalist as val}
      <option value={val}></option>
    {/each}
  </datalist>
{/if}

<style>
  label {
    flex-direction: var(--direction);
  }
</style>
