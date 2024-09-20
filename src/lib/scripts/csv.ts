const arrayToCsv = (data: any[][], separator: "," | ";" = ","): string => {
  return data.map(row => {
    return row
           .map(String)
           .map(x => x.replaceAll('"', '""'))
           .map(x => `"${x}"`)
           .join(separator)
  }).join("\r\n");
}

const download = (content: string, filename: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", filename);
  a.click();
}

export interface CsvParams {
  data: any[][],
  name?: string,
  separator?: "," | ";"
}

export const exportCsv = (params: CsvParams) => {
  const separator = params.separator ? params.separator : ";";
  const csvString = arrayToCsv(params.data, separator);
  const filename = params.name ? `${params.name}.csv` : `relaamo_kirjaukset-${new Date().toLocaleString()}.csv`;
  const contentType = "text/csv;charset=utf-8;";

  download(csvString, filename, contentType);
}

