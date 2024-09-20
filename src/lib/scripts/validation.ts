import type { LogData, SubjectKey, LendingKey, TargetKey} from "../types/data";

const validateDateTimes = 
(data: LogData, setErrors: (er: string[]) => void) => {
  const errors = [];

  if(!data.date) errors.push("Päivämäärä puuttuu");
  if(!data.startTime) errors.push("Aloitusaika puuttuu");
  if(!data.endTime) errors.push("Päättymisaika puuttuu");

  setErrors(errors);
}

const validateCustomerInfo = 
(data: LogData, setErrors: (er: string[]) => void) => {
  const errors = [];

  if(!data.age) errors.push("Asiakkaan ikähaarukka puuttuu");
  if(!data.city) errors.push("Asiakkaan asuinpaikkakunta puuttuu");

  setErrors(errors);
}

const validateSubjects = 
(data: LogData, setErrors: (er: string[]) => void) => {
  const errors = [];
  let selected = 0;

  for(const key in data.subject) {
    if(data.subject[key as SubjectKey]) {
      selected++; 
    }
  }

  if(selected === 0) errors.push("Valitse vähintään yksi ohjauksen aihe");

  setErrors(errors);
}

const validateLending = 
(data: LogData, setErrors: (er: string[]) => void) => {
  const errors = [];

  if(data.productLending.done) {
    const { details } = data.productLending;
    let productsAmount = 0;

    for(const key in details) {
      productsAmount += details[key as LendingKey].amount;
    }

    if(productsAmount === 0) errors.push("Lainattujen tuotteiden määrä puuttuu");
  }

  setErrors(errors);
}

const validateTargetGroup = 
(data: LogData, setErrors: (er: string[]) => void) => {
  const errors = [];
  let groupSize = 0;

  for(const key in data.targetGroup) {
    groupSize += data.targetGroup[key as TargetKey].amount;
  }

  if(groupSize === 0) errors.push("Asiakkaiden määrä puuttuu. Määrä ei voi olla yhteensä 0.")

  setErrors(errors);
}

// const validateFollowUp = (data: LogData, setErrors: (er: string[]) => void) => {
//   if(data.followUp.done) {
//     if(!data.followUp.place)
//   }
// }


export const validateLogData = 
(data: LogData): {status: boolean, errors: string[]} => {
  let errors: string[] = [];

  const setErrors = (er: string[]) => {
    if(er.length === 0) return;
    errors = [...errors, ...er]; 
  }

  validateDateTimes(data, setErrors);
  validateCustomerInfo(data, setErrors);
  validateSubjects(data, setErrors);
  validateLending(data, setErrors);
  validateTargetGroup(data, setErrors);

  console.log({ status: errors.length === 0, errors });
  return { status: errors.length === 0, errors };
}