"use strict";

// --Блок объявления переменных--
let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let servicePrice1;
let service2;
let servicePrice2;
let fullPrice = 0;
let rollPec = 0;
let servicePercentPrice = 0;
let allServicePrices = 0;
let strScreens;
const rollback = 64;
const _regExp = /\s*(?:;|$)\s*/;

// --Блок описания функций--
// Функция проверки строки
const stringOrNumber = function (str) {
  if (isNaN(str)) {
    return true;
  } else {
    return false;
  }
};

// Функция проверки числа
const isFiniteOrNull = function (num) {
  if (num !== null && num !== "") {
    if (num.trim() !== "") {
      let _num = num.trim();
      if (isFinite(_num.replace(",", ".").trim())) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой".
// Пример: " КаЛьКулятор Верстки" - > "Калькулятор верстки"
const changeTitle = function (str) {
  let _str = str.trim().toLocaleLowerCase();
  return (str = _str.charAt(0).toUpperCase() + _str.slice(1));
};

const changeScreens = function (screens) {
  strScreens = screens.trim().toLowerCase();
};

// Функция получения заголовка
const getTitle = function () {
  do {
    title = prompt("Как называется ваш проект?");
  } while (!stringOrNumber(title));
  title = changeTitle(title);
};

// Функция получения Тип экранов
const getScreens = function () {
  do {
    screens = prompt("Какие типы экранов нужно разработать?");
  } while (!stringOrNumber(screens));
  screens = changeScreens(screens);
};

// Функция получения стоимости
const getScreenPrice = function () {
  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isFiniteOrNull(screenPrice));
  screenPrice = convertStrInNumber(screenPrice);
};

// Функция получения тип адаптива
const getAdaptive = function () {
  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getService = function () {
  let service = "";
  do {
    service = prompt("Какой дополнительный тип услуги нужен ?");
  } while (!stringOrNumber(service));
  return service;
};

const convertStrInNumber = function (variable) {
  return parseFloat(variable.replace(",", ".").trim());
};

const getServicePrice = function () {
  let servicePrice = 0;
  do {
    servicePrice = prompt("Сколько это будет стоить ?");
  } while (!isFiniteOrNull(servicePrice));
  return (servicePrice = convertStrInNumber(servicePrice));
};

//  Функция возвращает сумму всех дополнительных услуг.
const getAllServicePrices = function () {
  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      service1 = getService();
      servicePrice1 = getServicePrice();
    }
    if (i == 1) {
      service2 = getService();
      servicePrice2 = getServicePrice();
    }
  }
  allServicePrices = servicePrice1 + servicePrice2;
};

// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getFullPrice = function () {
  return screenPrice + allServicePrices;
};

const getRollPec = function () {
  return fullPrice * (rollback / 100);
};

// Функция возвращает итоговую стоимость за вычетом процента отката.
const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - rollPec);
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

// Функция проверки типа переменных
const showTypeOf = function (variable) {
  console.log(`${variable}:`, typeof variable);
};

const actionResual = function (variable) {
  console.log(variable);
};

// Функция запроса вопросов
const askQuestions = function () {
  getTitle();
  getScreens();
  getScreenPrice();
  getAdaptive();
  getAllServicePrices();
};

// --Блок функционала--
askQuestions();
fullPrice = getFullPrice();
rollPec = getRollPec();
servicePercentPrice = getServicePercentPrices();
// - вызовы функции showTypeOf
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

// --Блок вывода в консоль--
// - вывод строки с типами экранов для разработки screens
console.log(strScreens.split(_regExp));
// - сообщение о скидке пользователю (вызовы функции getRollbackMessage)
console.log(getRollbackMessage(fullPrice));
// - стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
console.log(servicePercentPrice);
