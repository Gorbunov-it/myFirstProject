"use strict";

// --Блок объявления переменных--
let title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
// Стоимость верстки экраноk
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен ?");
const servicePrice1 = +prompt("Сколько это будет стоить ?");
const service2 = prompt("Какой дополнительный тип услуги нужен ?");
const servicePrice2 = +prompt("Сколько это будет стоить ?");
const rollback = 64;
// Стоимось верстки + доп.услуг
let fullPrice = 0;
// Процент отката посреднику за работу
let rollPec = 0;
// тоговую стоимость за вычетом отката посреднику
let servicePercentPrice = 0;
// Стоимось всех доп.услуг
let allServicePrices = 0;
// Перевод строки к нижнему регистру
const strScreens = screens.toLowerCase();
// Регулярное выражение
const _regExp = /\s*(?:;|$)\s*/;

// --Блок описания функций--
//  Функция возвращает сумму всех дополнительных услуг.
const getAllServicePrices = function (servicePrice1, servicePrice2) {
  return servicePrice1 + servicePrice2;
};

// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг(screenPrice + allServicePrices).
const getFullPrice = function (screenPrice) {
  return screenPrice + getAllServicePrices(servicePrice1, servicePrice2);
};

// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой".
// Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
const getTitle = function (title) {
  let _str = title.trim().toLocaleLowerCase();
  return (title = _str.charAt(0).toUpperCase() + _str.slice(1));
};

// 4) Объявить функцию getServicePercentPrices.
// Функция возвращает итоговую стоимость за вычетом процента отката.
// Результат сохраняем в переменную servicePercentPrice(итоговая стоимость минус сумма отката)
const getServicePercentPrices = function (fullPrice, rollPec) {
  return Math.ceil(fullPrice - rollPec);
};

const showTypeOf = function (variable) {
  console.log(`${variable}:`, typeof variable);
};

// Функция возвращает скидку.
const getRollbackMessage = function (price) {
  if (price > 30000) {
    return "Даем скидку в 10%";
  } else if (price > 15000 && price <= 30000) {
    return "Даем скидку в 5%";
  } else if (price > 0 && price <= 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

// --Блок функционала--
fullPrice = getFullPrice(screenPrice);
rollPec = fullPrice * (rollback / 100);
servicePercentPrice = getServicePercentPrices(fullPrice, rollPec);
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

// --Блок вывода в консоль--
// - вызовы функции showTypeOf
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
// - вывод строки с типами экранов для разработки screens
console.log(strScreens.split(_regExp));
// - сообщение о скидке пользователю (вызовы функции getRollbackMessage)
console.log(getRollbackMessage(fullPrice));
// - стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
console.log(servicePercentPrice);
