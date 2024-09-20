import type { LogData } from "../types/data";
import { orderByDate } from "./data-formatting";
import { db } from "./firebase";
import { ref, get, set, push, onValue, child, query, limitToFirst } from "firebase/database";


export const pushToDb = async <T>(refString: string, data: T) => {
  try {
    const dbRef = ref(db, refString);
    await push(dbRef, data);

    console.log("onnistui")

    return { status: true, msg: "" }
  }
  catch(err) {
    console.log("error", err);
    return { status: false, msg: (err as Error).message }
  }
}

export const setToDb = async <T>(refString: string, data: T) => {
  try {
    const dbRef = ref(db, refString);
    await set(dbRef, data);

    return { status: true, msg: "" }
  }
  catch(err) {
    console.log(err);
    return { status: false, msg: (err as Error).message }
  }
}

export const deleteFromDb = async (refString: string) => {
  const res = await setToDb(refString, null);
  return res;
}

export const getFromDb = 
async <T>(refString: string, limit?: number): Promise<T | null> => {

  const dbRef = ref(db, refString);
  const dbQuery = limit !== undefined ? query(dbRef, limitToFirst(limit)) : dbRef;
  const snapshot = await get(dbQuery);
  
  if(snapshot.exists()) {
    const data: T = snapshot.val();
    return data;
  }

  return null;
} 


export const createListener = 
<T>(refString: string, cb: (data: T[]) => void) => {
  const dbRef = ref(db, refString);
  
  return onValue(dbRef, snapshot => {
    const data = snapshot.val(); 
    const arr = [];

    if(data) {
      for(const key in data) {
        arr.push({...data[key], key});
      }
      const orderedArr = orderByDate(arr.reverse());
      cb(orderedArr);
    }
  });
}