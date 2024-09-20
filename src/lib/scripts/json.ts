export type City =   "Eura" | "Eurajoki" | "Harjavalta" | "Huittinen" |
"Jämijärvi" | "Kankaanpää" | "Karvia" | "Kokemäki" |"Merikarvia" | "Nakkila" | 
"Pomarkku" | "Pori" | "Rauma" | "Siikainen" | "Säkylä" | "Ulvila" | "Muu";

export type AgeRange = "0-19" | "20-39" |  "40-49" |  "50-59" | 
"60-69" |  "70-79" | "80-89" | "90+" | "Ei tietoa";

export interface LogData {
  id: string;
  date: Date | string; // ISO-8601
  startTime: string; // ISO-8601
  endTime: string; // ISO-8601
  age: AgeRange | null;
  city: City;
  place: string | null;
  type: string;
  targetGroup: {
    customer: { amount: number },
    relative: { amount: number },
    professional: { amount: number },
    student: { amount: number },
  },
  subject: {
    hearing_aids: boolean,
    vision_aids: boolean,
    safety_aids: boolean,
    memory_aids: boolean,
    other: boolean
  },
  followUp: { 
    done: boolean, 
    place?: string 
  },
  productLending: { 
    done: boolean, 
    details: {
      vision: { amount: number, products: string[] | string | null },
      hearing: { amount: number, products: string[] | string  | null },
      safety: { amount: number, products: string[] | string  | null },
      memory: { amount: number, products: string[] | string  | null },
      other: { amount: number, products: string[] | string  | null }
    } 
  }
}

export type LogObject = {
    [key: string] : LogData
}

// const keys = Object.keys(data);

// keys.forEach(key => {

// });
export type TargetKey = "customer" | "relative" | "professional" | "student";
export type SubjectKey = "hearing_aids" | "vision_aids" | "safety_aids" | "memory_aids" | "other";
export type LendingKey = "vision" | "hearing" | "safety" | "memory" | "other";

import { getFromDb } from "./db";

const formatDateTimes = (data: LogObject) => {
  const keys = Object.keys(data);

  keys.forEach(key => {
    if(data[key].date) {
      data[key].date = new Date(data[key].date).toISOString();
    }
    if(data[key].startTime) {
      data[key].startTime = new Date(data[key].startTime).toISOString(); 
    }
    if(data[key].endTime) {
      data[key].endTime = new Date(data[key].endTime).toISOString();
    }
  });
}

const formatProductLending = (data: LogObject) => {
  const keys = Object.keys(data);

  keys.forEach(key => {
    const lendingKeys = Object.keys(data[key].productLending.details);
    const done = data[key].productLending.done;
    
    lendingKeys.forEach(k => {
      if(!done) {
        return data[key].productLending.details[k as LendingKey].products = null;
      }
      if(data[key].productLending.details[k as LendingKey].amount === 0) {
        data[key].productLending.details[k as LendingKey].products = null;
      }
      if(Array.isArray(data[key].productLending.details[k as LendingKey].products)) {
        if((data[key].productLending.details[k as LendingKey].products as string[])[0] === "") {
          if((data[key].productLending.details[k as LendingKey].products as string[]).length === 1) {
            return data[key].productLending.details[k as LendingKey].products = null;
          }
          else {
            return data[key].productLending.details[k as LendingKey].products = data[key].productLending.details[k as LendingKey].products!.slice(1);
          }
        }
      }
      if(typeof data[key].productLending.details[k as LendingKey].products === "string") {
        if(data[key].productLending.details[k as LendingKey].products!.length > 2) {
          data[key].productLending.details[k as LendingKey].products = [
            data[key].productLending.details[k as LendingKey].products as string
          ];
        }
        else {
          data[key].productLending.details[k as LendingKey].products = null;
        }
      }
    });
  });
}

const formatPlace = (data: LogObject) => {
  const keys = Object.keys(data);

  keys.forEach(key => {
    if(!data[key].place) {
      data[key].place = null;
    }
  })
}

const addIds = (data: LogObject) => {
  const keys = Object.keys(data);

  keys.forEach(key => {
    data[key].id = key
  })
}

const logOne = (data: LogObject) => {
  const values = Object.values(data);
  const lastIndex = values.length - 1;

  console.log("log one", values[lastIndex]);
}

const formatLogs = (data: LogObject) => {
  formatProductLending(data);
  formatDateTimes(data);
  formatPlace(data);
  addIds(data);

  return data;
}

export const createDownloadHTML = (data: LogObject | EventObject, prefix: string = "log") => {
  const json = JSON.stringify(data, null, 2);
  const date = new Date().toLocaleDateString();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
  const a = document.createElement("a");
  

  a.setAttribute("href",     dataStr     );
  a.setAttribute("download", `funteeraamo_${prefix}_data-${date}.json`);
  a.innerText = "Lataa json-tiedosto";

  return a.outerHTML;
}

export const loadLogsObject = async () => {
  const data = await getFromDb<LogObject>("/funteeraamo/logs");

  if(!data) {
    console.log("Ei dataa!");
    return null;
  }

  logOne(data);
  const formattedData = formatLogs(structuredClone(data));

  logOne(formattedData);
  return formattedData;
}

export interface EventLogData {
  id: string;
  date: Date | string;
  name: string;
  city: string;
  amount: number;
}

export type EventObject = {
  [key: string] : EventLogData;
}

export const loadEventsObject = async () => {
  const data = await getFromDb<EventObject>("/funteeraamo/events");

  if(!data) {
    console.log("Ei dataa!");
    return null;
  }

  Object.keys(data).forEach(key => {
    data[key].id = key;
  });
  
  return data;
}