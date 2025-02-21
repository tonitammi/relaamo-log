/**
 * Muuntaa JSON-taulukon CSV-muotoon
 * @param data JSON-taulukko
 * @returns CSV-merkkijono
 */
function convertJsonToCsv(data: any[], separator: ";" | "," = ";"): string {
    if (!data.length) return '';

    const headers = [
        'id',
        'title',
        'description',
        'followUp.email',
        'followUp.phone',
        'productLending.enabled',
        'productLending.details',
        'targetGroup.adults',
        'targetGroup.children',
        'targetGroup.seniors'
    ];

    // Otsikkorivi
    const csvRows: string[] = [headers.join(separator)];

    // Muunnetaan jokainen objekti CSV-muotoon
    for (const row of data) {
        const values = headers.map(header => {
            const keys = header.split('.'); // Tukee syvää rakennetta esim. "followUp.email"
            let value: any = row;
            for (const key of keys) {
                value = value?.[key]; // Navigoidaan syvemmälle rakenteessa
                if (value === undefined) break;
            }
            return value !== undefined ? `"${String(value).replace(/"/g, '""')}"` : ''; // Suojataan lainausmerkit
        });

        csvRows.push(values.join(separator)); // CSV-rivi
    }

    return csvRows.join('\n');
}

/**
 * Lataa CSV-tiedoston selaimessa
 * @param csvData CSV-merkkijono
 * @param filename 
 */
function downloadCsv(csvData: string, filename: string): void {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export const exportCsv = (data: any[], filename: string = `relaamo_data_${new Date().toLocaleDateString()}`) => {
  const csvString = convertJsonToCsv(data);
  downloadCsv(csvString, filename);
}