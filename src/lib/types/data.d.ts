export type City =   "Eura" | "Eurajoki" | "Harjavalta" | "Huittinen" |
"Jämijärvi" | "Kankaanpää" | "Karvia" | "Kokemäki" |"Merikarvia" | "Nakkila" | 
"Pomarkku" | "Pori" | "Rauma" | "Siikainen" | "Säkylä" | "Ulvila" | "Muu";

// export type AgeRange = { min: 0, max: 19 } | { min: 20, max: 39 } | 
// { min: 40, max: 49 } | { min: 50, max: 59 } | { min: 60, max: 69 } | 
// { min: 70, max: 79 } | { min: 80, max: 89 } |{ min: 90, max: 100 }

export type AgeRange = "0-19" | "20-39" |  "40-49" |  "50-59" | 
"60-69" |  "70-79" | "80-89" | "90+" | "Ei tietoa";

export interface LogData {
  //
  key?: string;
  // date and time
  date: Date | string;
  startTime: number | null;
  endTime: number | null;
  // customer
  age: AgeRange | null;
  city: City;
  // guidance
  place: string;
  type?: string;
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
  followUp: { done: boolean, place?: string },
  // lending
  productLending: { 
    done: boolean, 
    details: {
      vision: { amount: number, products: string[] | string },
      hearing: { amount: number, products: string[] | string },
      safety: { amount: number, products: string[] | string },
      memory: { amount: number, products: string[] | string },
      other: { amount: number, products: string[] | string }
    } 
  }
}

export type TargetKey = "customer" | "relative" | "professional" | "student";
export type SubjectKey = "hearing_aids" | "vision_aids" | "safety_aids" | "memory_aids" | "other";
export type LendingKey = "vision" | "hearing" | "safety" | "memory" | "other";

export interface EventLogData {
  key?: string;
  date: Date | string;
  name: string;
  city: string;
  amount: number;
}