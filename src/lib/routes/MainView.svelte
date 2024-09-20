<script lang="ts">
  import Button from "../components/shared/Button.svelte";
  import Icon from "../components/shared/Icon.svelte";
  import { pageTitle } from "../scripts/stores";

  $pageTitle = "Etusivu";
</script>

<div class="content">
  <h3>Toiminnot</h3>
  <Button href="/#/luo-kirjaus">
    <Icon name="post_add" />
    Luo asiakaskirjaus
  </Button><br />
  <Button href="/#/luo-tapahtuma-kirjaus">
    <Icon name="event" />
    Luo tapahtumakirjaus
  </Button><br />
</div>

<div class="content">
  <h3>Tietojen selaaminen</h3>
  <Button href="/#/kirjaukset">
    <Icon name="table_chart" />
    Selaa kirjauksia
  </Button><br />
  <Button href="/#/yhteenveto">
    <Icon name="monitoring" />
    Yhteenveto
  </Button><br />
  <!-- <Button href="/#/hae-data">
    <Icon name="upgrade" />
    Hae kirjausdata
  </Button><br /> -->
</div>

<style>
  .content {
    position: relative;
    width: 480px;
    max-width: 100%;
    margin: 2rem auto;
  }
</style>