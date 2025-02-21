import type { AgeRange, City, EventLogData, LogData } from "../types/data";

// Form options

export const cities: City[] = [
  "Eura",
  "Eurajoki",
  "Harjavalta",
  "Huittinen",
  "Jämijärvi",
  "Kankaanpää",
  "Karvia",
  "Kokemäki",
  "Merikarvia",
  "Nakkila",
  "Pomarkku",
  "Pori",
  "Rauma",
  "Siikainen",
  "Säkylä",
  "Ulvila",
  "Muu"
];

export const ageRanges: AgeRange[] = [
  "0-19", 
  "20-39",
  "40-49",
  "50-59",
  "60-69",  
  "70-79",
  "80-89",
  "90+",
  "Ei tietoa"
];

export const subjectOfGuidance = [
  { label: "Näkemisen apuvälineet", key: "vision_aids", value: false },
  { label: "Kuulon apuvälineet", key: "hearing_aids", value: false },
  { label: "Turvallisuuden apuvälineet", key: "safety_aids", value: false },
  { label: "Muistin apuvälineet", key: "memory_aids", value: false },
  { label: "Muu ohjaus", key: "other", value: false },
];

export const placeOfGuidance = [
  { label: "Funteeraamossa", value: "funteeraamo" },
  { label: "Puhelimitse", value: "puhelin" },
  { label: "Sähköpostilla", value: "sähköposti" },
  { label: "Muu", value: "muu" }
];

export const typeOfGuidance = [
  { label: "Yksilöohjaus", value: "yksilö" },
  { label: "Ryhmäohjaus", value: "ryhmä" }
];

export const targetGroup = [
  { label: "Asiakas", amount: 0, key: "customer" },
  { label: "Omainen", amount: 0, key: "relative" },
  { label: "Ammattilainen", amount: 0, key: "professional" },
  { label: "Opiskelija", amount: 0, key: "student" }
];

export const finnishLendingCategories = [
  {key: "vision", label: "Näkemisen apuvälineet"},
  {key: "hearing", label: "Kuulemisen apuvälineet"},
  {key: "safety", label: "Turvallisuuden apuvälineet"},
  {key: "memory", label: "Muistamisen apuvälineet"},
  {key: "other", label: "Muut apuvälineet"}
];

export const finnishSubjectKeys = {
  hearing_aids: "Kuulemisen apuvälineet",
  vision_aids: "Näkemisen apuvälineet",
  safety_aids: "Turvallisuuden apuvälineet",
  memory_aids: "Muistin apuvälineet",
  other: "Muut apuvälineet",
}

export const getFinnishLendingCategory = (key: string) => {
  const category = finnishLendingCategories.find(x => x.key === key);

  return category?.label || "";
}

// Log data

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

const eventLogData: EventLogData = {
  date: new Date(),
  name: "",
  city: "",
  amount: 2 
}

export const getEventLogData = (): EventLogData => {
  const data = structuredClone(eventLogData);
  data.date = new Date();
  return data;
}

export const getLogData = (): LogData => {
  const data = structuredClone(logData);
  return data;
}

