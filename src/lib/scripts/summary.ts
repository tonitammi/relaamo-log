import { getWeekDayString } from "../components/datetime/utils";
import type { LogData, EventLogData,TargetKey, LendingKey } from "../types/data"
import { ageRanges, cities, getFinnishLendingCategory, subjectOfGuidance, targetGroup } from "./data"

// utils

// events

export const getTotalEventParticipants = (data: EventLogData[]) => {
  let sum = 0;
  data.forEach(d => sum += d.amount);
  
  return sum;
}

export const getEventCities = (data: EventLogData[]) => {
  const obj: {[k: string]: number} = {};
  const arr: {city: string, amount: number}[] = [];

  data.forEach(({city}) => {
    if(obj[city]) return obj[city] += 1;
    return obj[city] = 1;
  });

  for(const key in obj) {
    arr.push({ city: key, amount: obj[key] });
  }

  return arr;
}

// logs
export const getAgeDistribution = (data: LogData[]) => {
  const obj: {[key: string]: number} = {};
  const arr: {range: string, amount: number}[] = [];

  ageRanges.forEach(range => obj[range] = 0);

  data.forEach(({ age, targetGroup }) => {
    obj[age!] = obj[age!] + targetGroup.customer.amount;
  });

  for(const key in obj) {
    arr.push({ range: key, amount: obj[key] });
  }

  return arr;
}

export const getMostPopularAgeRange = (ageRange: {range: string, amount: number}[]) => {
  let range: {range: string, amount: number} = {range: "0-19", amount: 0};

  ageRange.forEach(r => {
    if(r.amount > range.amount) {
      range = r;
    }
  })

  return range;
}

export const getTargetGroupAmounts = (data: LogData[]) => {
  const obj: {[key: string]: { label: string, amount: number }} = {};
  const arr: {key: string, label: string, amount: number}[] = [];
  
  targetGroup.forEach(({key, amount, label}) => {
    obj[key] = { label, amount };
  })

  data.forEach(log => {
    for(const key  in log.targetGroup) {
      obj[key].amount += log.targetGroup[key as TargetKey].amount;
    }
  });

  for(const key in obj) {
    arr.push({ key, label: obj[key].label, amount: obj[key].amount });
  }

  return arr;
}

// visit info

export const getTotalCustomers = (data: LogData[]) => {
  let total = 0;

  data.forEach(log => total += log.targetGroup.customer.amount);
  
  return total;
}

export const getTotalVisits = (data: LogData[]) => {
  let total = 0;

  data.forEach(log => {
    for(const key in log.targetGroup) {
      total += log.targetGroup[key as TargetKey].amount;
    }
  });
  
  return total;
}

export const getVisitPerWeekDay = (data: LogData[]) => {
  const obj: {[key: string] : number} = {};

  data.forEach(log => {
    const weekDay = getWeekDayString(log.date);
    if(obj[weekDay]) {
      return obj[weekDay] = obj[weekDay] + 1;
    }
    obj[weekDay] = 1;
  })

  return obj;
}

export const getMostPopularDay = (data: LogData[]) => {
  let mostPopularDay = "";
  let maxVisits = 0;

  const obj = getVisitPerWeekDay(data);

  for(const key in obj) {
    if(!mostPopularDay) {
      maxVisits = obj[key];
      mostPopularDay = key;
    }
    else {
      if(obj[key] >= maxVisits) {
        maxVisits = obj[key];
        mostPopularDay = key;
      }
    }
  }

  return mostPopularDay;
}

// city

export const getCityCustomers = (data: LogData[]) => {
  const obj: {[key: string]: number} = {};
  const arr: {city: string, amount: number}[] = [];

  cities.forEach(city => obj[city] = 0);
  data.forEach(({ city, targetGroup }) => {
    obj[city!] = obj[city!] + targetGroup.customer.amount;
  });

  for(const key in obj) {
    arr.push({ city: key, amount: obj[key] });
  }

  return arr;
}

// duration

export const getTotalDuration = (data: LogData[]) => {
  let sum = 0;
  data.forEach(log => sum += log.endTime! - log.startTime!);

  return sum;
}

export const getAvgDuration = (data: LogData[]) => {
  const totalDuration = getTotalDuration(data);
   
  return Math.round(totalDuration / data.length / 1000 / 60);
}  

// lending

export const getTotalLendingAmount = (data: LogData[]) => {
  let sum = 0;
  data.forEach(log => {
    if(!log.productLending.done) return;
    Object.values(log.productLending.details).forEach(val => {
      sum += val.amount;
    });
  });

  return sum;
}

export const getAvgProductsPerVisit = (data: LogData[]) => {
  const visits = data.length;
  const lendings = getTotalLendingAmount(data);

  return Math.round(lendings / visits * 10) / 10;
}

export const getProductCategoryAmounts = (data: LogData[]) => {
  const arr: {label: string, amount: number}[] = []
  const obj: {[key: string] : number} = {
    vision: 0,
    hearing: 0,
    safety: 0,
    memory: 0,
    other: 0
  }

  data.forEach(log => {
    const products = log.productLending.details;

    for(const key in products) {
      obj[key] += products[key as LendingKey].amount;
    }
  });

  for(const key in obj) {
    arr.push({
      label: getFinnishLendingCategory(key),
      amount: obj[key]
    })
  }

  return arr;
}

export const getMostPopularLendingCategory = (data: LogData[]) => {
  const arr = getProductCategoryAmounts(data);
  let mostPopular = "";
  let maxAmount = 0;

  arr.forEach(a => {
    if(!mostPopular) {
      mostPopular = a.label;
      return maxAmount = a.amount;
    }

    if(maxAmount < a.amount) {
      mostPopular = a.label;
      return maxAmount = a.amount;
    }
  });

  return { label: mostPopular, amount: maxAmount };
}

// follow up
export const getFollowUpPercents = (data: LogData[]) => {
  const customers = getTotalCustomers(data);
  let followUps = 0;

  data.forEach(log => {
    if(log.followUp.done) followUps++;
  });
  
  const decimal = followUps / customers;
  const percents = Math.round(decimal * 100);

  return percents;
}

export const getFollowUps = (data: LogData[]) => {
  const obj: {[k: string]: number} = {};
  const arr: {label: string, amount: number}[] = [];

  data.forEach(log => {
    if(log.followUp.done) {
      if(obj[log.followUp.place as string]) {
        return obj[log.followUp.place as string] += 1;
      }
      return obj[log.followUp.place as string] = 1;
    }
  });

  for(const key in obj) {
    if(key) {
      arr.push({ label: key, amount: obj[key] });
    }
    else {
      arr.push({ label: "Ei määritelty", amount: obj[key] });
    }
  }

  console.log(arr);
  return arr;
}

