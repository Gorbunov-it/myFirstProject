"use strict";

// Создать переменных
let title = "My First Project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1024;
let rollback = 64;
let fullPrice = 120000;
let adaptive = true;
let servicePercentPrice = 0;

//переменные lesson03
let service1 = "Дополнительнвя услуга №1";
let service2 = "Дополнительнвя услуга №2";
let servicePrice1 = 0;
let servicePrice2 = 0;

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
console.log(strScreens.split(","));

let rollPec = fullPrice * (rollback / 100);
console.log("Процент отката: " + rollPec);

// Задание lesson03
// 1) Весь функционал что был ранее оставляем, если что то необходимо удалить, об этом будет написано в задании
// 2) При присваивании уже объявленным пустым переменным какого-либо значения, значение переменной присваиваем сразу при декларации (не нужно создавать пустую переменную а потом ей же присваивать значение)
// 3) Спрашиваем у пользователя “Как называется ваш проект?” и результат сохраняем в переменную title
title = prompt("Как называется ваш проект?");
// 4) Спросить у пользователя “Какие типы экранов нужно разработать?” сохранить в переменную screens (пример: "Простые, Сложные, Интерактивные")
screens = prompt("Какие типы экранов нужно разработать?", "пример: Простые, Сложные, Интерактивные");
// 5) Спросить у пользователя “Сколько будет стоить данная работа?” и сохранить в переменную screenPrice (пример: 12000)
screenPrice = prompt("Сколько будет стоить данная работа?", "пример: 12000");
// 6) Спросить у пользователя “Нужен ли адаптив на сайте?” и сохранить данные в переменной adaptive (булево значение true/false)
adaptive = confirm("Нужен ли адаптив на сайте?");
// 7) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные
// 1. “Какой дополнительный тип услуги нужен ?” (например service1, service2)
// 2. “Сколько это будет стоить ?” (например servicePrice1, servicePrice2) в итоге 4 вопроса и 4 разные переменных, вопросы задаются в такой последовательности Название - Стоимость - Название - Стоимость
service1 = prompt("Какой дополнительный тип услуги нужен ?");
servicePrice1 = prompt("Сколько это будет стоить ?");
service2 = prompt("Какой дополнительный тип услуги нужен ?");
servicePrice2 = prompt("Сколько это будет стоить ?");
// 8) Вычислить итоговую стоимость работы учитывая стоимость верстки экранов и дополнительных услуг (screenPrice + servicePrice1 + servicePrice2) и результат занести в переменную fullPrice
fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);
// 9) Объявить переменную servicePercentPrice и занести в нее итоговую стоимость за вычетом отката посреднику(servicePercentPrice = fullPrice - Откат посреднику),
//округлив результат в большую сторону(методы объекта Math в помощь).Вывести servicePercentPrice в консоль.
servicePercentPrice = fullPrice - rollPec;
console.log(`Итоговая стоимость: ${Math.ceil(servicePercentPrice)}`);
// 10) Написать конструкцию условий (расчеты приведены в рублях) (вывести в консоль)
//   - Если fullPrice больше 30000, то “Даем скидку в 10%”
//   - Если fullPrice больше 15000 и меньше 30000, то сообщение “Даем скидку в 5%”
//   - Если fullPrice меньше 15000 и больше 0 то в консоль вывести сообщение “Скидка не предусмотрена”
//   - Если отрицательное значение то вывести “Что то пошло не так”
//   - Учесть варианты 0, 15000 и 30000(к какому уровню не важно)
if (fullPrice > 3000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice <= 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice > 0 && fullPrice <= 15000) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что то пошло не так");
}
