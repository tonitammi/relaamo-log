import type { LogData, EventLogData } from "../types/data";

export const searchByDate = (data: LogData[] | EventLogData[], date: Date | string) => {
  const searchDate = new Date(date).toLocaleDateString();

  const results = data.filter(log => {
    const d = new Date(log.date).toLocaleDateString();
    return d === searchDate;  
  });

  return results;
}

export const searchByCity = (data: LogData[] | EventLogData[], city: string) => {
  const results = data.filter(log => log.city.toLowerCase() === city.toLowerCase());
  return results;
}