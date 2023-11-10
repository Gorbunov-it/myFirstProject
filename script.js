// Создать переменных
const title = "My First Project";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 1024;
const rollback = 64;
const fullPrice = 120000;
const adaptive = true;

// Вывод типа значений переменых
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// Вычисление длины строки
// Вывод переменной
console.log(screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} рублей`);

console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

// Перевод строки к нижнему регистру
const strScreens = screens.toLowerCase();
// Вывод массива
const _regExp = /\s*(?:;|$)\s*/;
console.log(strScreens.split(_regExp));

let rollPec = (fullPrice * (rollback/100));
console.log("Процент отката: " + rollPec);