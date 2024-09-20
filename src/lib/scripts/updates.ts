import { writable, get } from "svelte/store";

export interface UpdateInfo {
  title: string;
  text: string;
  shown: boolean;
} 
const updateJson = localStorage.getItem("update-info");
const initialValue = updateJson ? JSON.parse(updateJson) : null;

export const updateInfo = writable<UpdateInfo | null>(initialValue);

updateInfo.subscribe(value => {
  const json = JSON.stringify(value);
  localStorage.setItem("update-info", json);
});

export const doNotShow = () => {
  const obj = get(updateInfo);
  if(!obj) return;

  obj.shown = true;
  updateInfo.set(obj);
}

//update 1,
if(get(updateInfo) === null) {
  updateInfo.set({
    title: "Päivityksiä",
    text: `
      Korjaukset:
      <ul>
        <li>Aikaleima</li>
        <li>Mihin ohjattu tallennusvirhe</li>
      </ul>
      Ominaisuudet:
      <ul>
        <li>Tapahtumakirjauksia muokkaaminen</li>
        <li>Asiakaskirjausten suodatus selaa kirjauksia näkymässä</li>
      </ul>
    `,
    shown: false
  })
}
