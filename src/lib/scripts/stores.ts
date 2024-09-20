import type { User } from "firebase/auth";
import type { LendingKey, LogData } from "../types/data";
import { writable } from "svelte/store";

export const pageTitle = writable<string>("Etusivu");
export const uid = writable<string>();
export const user = writable<User | null>(null);

export const logDataStore = writable<LogData[]>([]);

export const followUpPlaces = writable<string[]>([]);
export const lendProducts = writable<{[key: string] : string[]}>({
  vision: [],
  hearing: [],
  safety: [],
  memory: [],
  other: []
});

logDataStore.subscribe(val => {

  console.log("data val", val);

  const f: string[] = [];
  const l: {[key: string] : string[]} = {
    vision: [],
    hearing: [],
    safety: [],
    memory: [],
    other: []
  }

  val.forEach(log => {
    if(log.followUp.place) f.push(log.followUp.place);
    
    Object.entries(log.productLending.details).forEach(([key, value]) => {
      if(!value) return;
      
      try {
        (value.products as string[]).forEach(product => {
          if(product) l[key].push(product);
        });
        l[key] = [...new Set(l[key])];
      }
      catch(err) {
        console.log("error log value", log);
        console.log(err);
      }
    });
  });

  followUpPlaces.set([... new Set(f)]);
  lendProducts.set(l);
});