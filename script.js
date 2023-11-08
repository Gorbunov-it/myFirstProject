// Создать переменных
let title = "My First Project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1024;
let rollback = 64;
let fullPrice = 120000;
let adaptive = true;

// Вывод типа значений переменых
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// Вычисление длины строки
let lenScreens = screens.length;
// Вывод переменной
console.log(lenScreens);

console.log("Стоимость верстки экранов" + " " + screenPrice + " " + "рублей");

console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей");

// Перевод строки к нижнему регистру
let strScreens = screens.toLowerCase();
// Вывод массива
console.log(strScreens.split(','));

let rollPec = (fullPrice * (rollback/100));
console.log("Процент отката: " + rollPec);