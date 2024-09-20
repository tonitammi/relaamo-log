<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "../shared/Icon.svelte";
  import type { EventLogData, LogData } from "../../types/data";

  export let label: string = "";
  export let dataBefore: LogData[] | EventLogData[];

  const dispatch = createEventDispatcher();
  const clear = () => {
    dispatch("remove", { 
      label, 
      data: dataBefore 
    })
  }

</script>

<button class="tag" on:click={clear}>
  {label}
  <Icon size="20" name="close" />
</button>

<style>
  .tag {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: .3rem .5rem;
    background: #d3d3d3;
    border: 1px solid #6f6f6f;
    border-radius: 6px;
  }
</style>