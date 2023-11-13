"use strict";

// Создать переменных
const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
// Стоимость верстки экраноk
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 64;
// Стоимость разработки сайта
let fullPrice = 12000;
const adaptive = confirm("Нужен ли адаптив на сайте?");
// итоговая стоимость за вычетом отката посреднику
const servicePercentPrice = 0;

//переменные lesson03
const service1 = prompt("Какой дополнительный тип услуги нужен ?");
const servicePrice1 = +prompt("Сколько это будет стоить ?");
const service2 = prompt("Какой дополнительный тип услуги нужен ?");
const servicePrice2 = +prompt("Сколько это будет стоить ?");
const discount = "";

// Перевод строки к нижнему регистру
const strScreens = screens.toLowerCase();

// Регулярное выражение
const _regExp = /\s*(?:;|$)\s*/;

// Процент отката посреднику за работу
const rollPec = fullPrice * (rollback / 100);

// итоговая стоимость работы
fullPrice = screenPrice + servicePrice1 + servicePrice2;

// тоговую стоимость за вычетом отката посреднику
servicePercentPrice = Math.ceil(fullPrice - rollPec);

// 10) Написать конструкцию условий (расчеты приведены в рублях) (вывести в консоль)
if (fullPrice > 30000) {
  discount = "Даем скидку в 10%";
} else if (fullPrice > 15000 && fullPrice <= 30000) {
  discount = "Даем скидку в 5%";
} else if (fullPrice > 0 && fullPrice <= 15000) {
  discount = "Скидка не предусмотрена";
} else {
  discount = "Что то пошло не так";
}

// Выводы:

// Вывод типа значений переменых
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// Вычисление длины строки
console.log(screens.length);

console.log(strScreens.split(_regExp));

console.log(`Стоимость верстки экранов ${screenPrice} рублей`);

console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

console.log(`Процент отката: ${rollPec}`);

console.log(`Итоговая стоимость: ${servicePercentPrice}`);

console.log(`Скидка: ${discount}`);
