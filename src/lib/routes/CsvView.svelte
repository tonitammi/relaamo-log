<script lang="ts">
  import type { LogData, EventLogData } from "../types/data";
  import { createListener } from "../scripts/db";

  let logs: LogData[] = [];
  let eventLogs: EventLogData[] = [];
  let loading: {logs: boolean, events: boolean} = {
    logs: true, 
    events: true
  };

  const loadLogData = async () => {
    const unsubscribe = createListener<LogData>("funteeraamo/logs", (data) => {
      logs = data;
      loading.logs = false;

      unsubscribe();
    });
  } 

  const loadEventLogData = async () => {
    const unsubscribe = createListener<EventLogData>("funteeraamo/events", (data) => {
      eventLogs = data;
      loading.events = false;

      unsubscribe();
    });
  }

  loadLogData();
  loadEventLogData();
</script>

{#if loading.logs && loading.events}
  <p>Kaikki ladatattu</p>
{/if}

