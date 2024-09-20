<script lang="ts">
  import type { LogData } from "./lib/types/data";
  import { onMount } from "svelte";
  import { logDataStore, user } from "./lib/scripts/stores";
  import { getAuthListener } from "./lib/components/auth/auth";
  import { updateInfo } from "./lib/scripts/updates";
  import { getFromDb } from "./lib/scripts/db";
  import { routes } from "./lib/routes";

  import Router from "svelte-spa-router";
  import MainLayout from "./lib/layouts/MainLayout.svelte";
  import LoginForm from "./lib/components/auth/LoginForm.svelte";
  import InfoBar from "./lib/components/shared/InfoBar.svelte";
  import { dbObjToArr } from "./lib/scripts/data-formatting";

  let loading = true;

  onMount(async () => {
    const data = await getFromDb<{[k: string] : LogData}>("funteeraamo/logs", 50);
    if(data) {
      $logDataStore = dbObjToArr<LogData>(data);
    }
  });

  onMount(() => {
    const removeListener = getAuthListener(u => {
      $user = u;
      loading = false;
    });

    return removeListener;
  });
</script>

{#if !loading}
  {#if $user}
    <InfoBar 
      title={$updateInfo?.title || ""}
      text={$updateInfo?.text || ""}
      show={$updateInfo !== null && $updateInfo.shown === false} 
    />
    <MainLayout>
      <Router {routes} />
    </MainLayout>
  {:else}
    <LoginForm />
  {/if}
{:else}
    <p style="position: relative; margin: 5rem auto; max-width: 280px;">
      Ladataan sivua...
    </p>
{/if}
