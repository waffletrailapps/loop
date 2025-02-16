import * as fs from "fs";
import * as path from "path";
import Papa from "papaparse";

const csvFilePath = path.join(__dirname, "../data/projectBoardTestData.csv");
const jsonFilePath = path.join(__dirname, "../data/projectBoardTestData.json");

// Read CSV File
const csvData = fs.readFileSync(csvFilePath, "utf8");

// Convert CSV to JSON
const parsedData = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  delimiter: ","
});

// Format the data (split tags)
const formattedData = parsedData.data.map((row) => ({
  appType: row.app_type,
  appName: row.app_name,
  taskName: row.task_name,
  columnName: row.column_name,
  tags: row.tags ? row.tags.split("|") : []
}));

// Write JSON File
fs.writeFileSync(jsonFilePath, JSON.stringify(formattedData, null, 2));

console.log("✅ CSV data converted to JSON successfully!");
