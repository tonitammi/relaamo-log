import type { LogData, EventLogData, LendingKey, SubjectKey } from "../types/data";
import { finnishLendingCategories, finnishSubjectKeys, targetGroup } from "./data";

export const formatData = (data: LogData) => {
  const formattedData = structuredClone(data);

  if(typeof formattedData.date === "object") {
    formattedData.date = (formattedData.date as Date).toISOString();
  }

  for(const key in formattedData.productLending.details) {
    if(typeof formattedData.productLending.details[key as LendingKey].products === "string") {
      const products = formattedData.productLending.details[key as LendingKey].products as string;
      formattedData.productLending.details[key as LendingKey].products = products.split(",").map(x => x.trim()); 
    }
  }

  return formattedData;
}

export const getSubjectsString = (data: LogData) => {
  const subjects = data.subject;
  const arr = [];

  for(const key in subjects) {
    if(subjects[key as SubjectKey]) {
      arr.push(finnishSubjectKeys[key as SubjectKey]);
    }
  }
  return arr.join(", ");
}


export const orderByDate = <T extends LogData>(data: T[], order: "asc" | "desc" = "asc") => {
  const compare = (x: T, y: T) => {
    const xDate = new Date(x.date).getTime();
    const yDate = new Date(y.date).getTime();
    const values = order === "desc" ? [1, -1] : [-1, 1];

    if (xDate > yDate) return values[0];
    if (xDate < yDate) return values[1];
    return 0;
  }
  
  return data.sort(compare);;
}

export const dbObjToArr = <T>(data: {[key: string]: T}) => {
  const arr: T[] = [];

  for(const key in data) {
    arr.push({...data[key], key});
  }

  return arr;
}

// Format csv

export const logData: LogData = {
  place: "funteeraamo",
  date: new Date(),
  startTime: null,
  endTime: null,
  city: "Pori",
  age: "50-59",
  subject: {
    hearing_aids: false,
    vision_aids: false,
    safety_aids: false,
    memory_aids: false,
    other: false
  },
  followUp: { done: false, place: "" },
  targetGroup: {
    customer: { amount: 0 },
    relative: { amount: 0 },
    professional: { amount: 0 },
    student: { amount: 0 },
  },
  productLending: { 
    done: false,  
    details: {
      vision: { amount: 0, products: [""] },
      hearing: { amount: 0, products: [""] },
      safety: { amount: 0, products: [""] },
      memory: { amount: 0, products: [""] },
      other: { amount: 0, products: [""] }
    }
  } 
}

const finnishLogLabels: {[k: string]: any} = {
  place: "Ohjauksen paikka",
  date: "PVM",
  startTime: "Aloitusaika",
  endTime: "Lopetusaika",
  age: "Ikahaarukka",
  city: "Asuinpaikkakunta",
  subject: "Ohjauksen aihe",
  followUp: "Ohjattiin eteenpäin",
  targetGroup: "",
  productLending: "",
}

const getLendingLabels = () => {
  const labels = finnishLendingCategories.map(({ label }) => label);
  return labels;
}

const getTargetGroupLabels = () => {
  const labels = targetGroup.map(({ label }) => label);
  return labels;
}

export const getLogCsvLabels = () => {
  const entries = Object.entries(finnishLogLabels);
  const labels: string[] = entries.map(([key, value]) => {
    if(key === "targetGroup") {
      return getTargetGroupLabels();
    }
    if(key === "productLending") {
      return getLendingLabels();
    }
    return value;
  }).flat();

  return labels;
}

console.log("csvLogLabels", getLogCsvLabels());

export const getEventCsvLabels = (data: LogData[]) => {

}