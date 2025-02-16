import * as fs from "fs";
import Papa from "papaparse";

export function readCSV(filePath: string): any[] {
  const csvData = fs.readFileSync(filePath, "utf8");
  return Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  }).data.map(row => ({
    appType: row.app_type.trim(),
    appName: row.app_name.trim(),
    taskName: row.task_name.trim(),
    columnName: row.column_name.trim(),
    tags: row.tags.split("|").map(tag => tag.trim()), // Convert CSV tags into an array
  }));
}
