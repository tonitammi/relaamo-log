export const getTimeString = (a: string | number | Date | null) => {
  if(a === null) return "";
  const localTime = new Date(a).toLocaleTimeString().split(".");
  const time = localTime[0] + ":" + localTime[1];

  return time;
}

export const timestampToTimeString = 
(timestamp: number, includeSeconds = false): string => {
  const endIndex = includeSeconds ? 19 : 16;
  const time = new Date(timestamp).toISOString().slice(11, endIndex);

  return time;
}

export const getInitialValue = 
(value: Date | string): string => {
  if(typeof value === "object") {
    let h = "" + value.getHours();
    let min = "" + value.getMinutes();

    h = h.length < 2 ? "0" + h : h;
    min = min.length < 2 ? "0" + min : min;

    return h + ":" + min;
  }
  return "";
}

export const parseMsToTime = (ms: number) => {
  //Get hours from milliseconds
  const hours = ms / (1000*60*60);
  const absoluteHours = Math.floor(hours);
  const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return h + ':' + m + ':' + s;
}

export const getWeekDayString = (d: Date | string) => {
  const days = ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"];
  const date = typeof d === "string" ? new Date(d) : d;
  const weekDay = date.getDay();

  return days[weekDay];
}
