// Скрипт для переключения данных
const fs = require("fs");

const states = {
  empty: "export const cardList = [];",
  single: `export const cardList = [
    {
      id: 1,
      topic: "Test",
      title: "Тестовая задача",
      date: "01.01.24",
      status: "В работе",
    },
  ];`,
  full: fs.readFileSync("data_backup.js", "utf8"),
};

const state = process.argv[2] || "full";

if (states[state]) {
  fs.writeFileSync("data.js", states[state]);
  console.log(`Переключено на состояние: ${state}`);
} else {
  console.log("Доступные состояния: empty, single, full");
}
