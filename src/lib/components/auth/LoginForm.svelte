<script lang="ts">
  import Button from "../shared/Button.svelte";
  import Input from "../shared/Input.svelte";
  import { signIn } from "./auth";
  
  let email: string = "";
  let password: string = "";
  let loading: boolean = false;
  let loginError: Error;

  let show: boolean = false;

  const login = async () => {
    if(!email || !password) return;
    loading = true;

    const { user, error } = await signIn(email, password);
    loading = false;
    if(error) return loginError = error;
  }

</script>

<form>
  <h2>Kirjautuminen</h2>
  <Input type="email" label="Sähköpostiosoite" bind:value={email} direction="column" />
  <Input type={show ? "text" : "password"} label="Salasana" bind:value={password} direction="column" />

  <label class="show">
    Näytä salasana
    <input type="checkbox" bind:checked={show} />
  </label>

  <div class="info">
    {#if loginError}
      <p>{loginError.message}</p>
    {/if}
  
    {#if loading}
      <p>Kirjaudutaan sisään...</p>
    {/if}
  </div>
  <div class="right">
    <Button on:click={login} disabled={!email || !password}>
      Kirjaudu sisään
    </Button>
  </div>
</form>

<style>
  form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 90%;
    max-width: 420px;
    padding: 1rem 1rem 2rem 1rem;
    margin: 3rem auto;
    background: #fff;
    border-radius: 8px;
    border: 1px solid gray;
  }

  .info {
    text-align: center;
  }

  .right {
    display: flex;
    justify-content: flex-end;
  }

  .show {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  @media screen and (max-width: 420px) {
    .right {
      justify-content: center;
    }
  }
</style>