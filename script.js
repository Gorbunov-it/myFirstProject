"use strict";

let appData = {
  // --Блок объявления переменных--
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  service1: "",
  servicePrice1: 0,
  service2: "",
  servicePrice2: 0,
  fullPrice: 0,
  rollPec: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,
  rollback: 64,
  _regExp: /\s*(?:;|$)\s*/,

  // --Блок описания функций--

  // Функция проверки строки
  stringOrNumber: function (str) {
    if (isNaN(str)) {
      return true;
    } else {
      return false;
    }
  },

  // Функция изменяет и возвращает title
  // Пример: " КаЛьКулятор Верстки" - > "Калькулятор верстки"
  changeTitle: function (value) {
    value = value.trim().toLocaleLowerCase();
    this.title = value.charAt(0).toUpperCase() + value.slice(1);
  },

  // Функция получения заголовка
  getTitle: function () {
    do {
      this.title = prompt("Как называется ваш проект?");
    } while (!this.stringOrNumber(this.title));
    this.changeTitle(this.title);
  },

  changeScreens: function (screens) {
    this.screens = screens.trim().toLowerCase();
  },

  // Функция получения Тип экранов
  getScreens: function () {
    do {
      this.screens = prompt("Какие типы экранов нужно разработать?");
    } while (!this.stringOrNumber(this.screens));
    this.changeScreens(this.screens);
  },

  // Функция проверки числа
  isFiniteOrNull: function (num) {
    if (num !== null && num.trim() !== "") {
      return isFinite(num.trim().replace(",", ".").trim());
    } else {
      return false;
    }
  },

  convertStrInNumber: function (variable) {
    return parseFloat(variable.replace(",", ".").trim());
  },

  // Функция получения стоимости
  getScreenPrice: function () {
    do {
      this.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!this.isFiniteOrNull(this.screenPrice));
    this.screenPrice = this.convertStrInNumber(this.screenPrice);
  },

  // Функция получения тип адаптива
  getAdaptive: function () {
    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  getService: function () {
    let service = "";
    do {
      service = prompt("Какой дополнительный тип услуги нужен ?");
    } while (!this.stringOrNumber(service));
    return service;
  },

  getServicePrice: function () {
    let servicePrice = 0;
    do {
      servicePrice = prompt("Сколько это будет стоить ?");
    } while (!this.isFiniteOrNull(servicePrice));
    return this.convertStrInNumber(servicePrice);
  },

  //  Функция возвращает сумму всех дополнительных услуг.
  getAllServicePrices: function () {
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        this.service1 = this.getService();
        this.servicePrice1 = this.getServicePrice();
      }
      if (i == 1) {
        this.service2 = this.getService();
        this.servicePrice2 = this.getServicePrice();
      }
    }
    this.allServicePrices = this.servicePrice1 + this.servicePrice2;
  },

  // Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
  getFullPrice: function () {
    return this.screenPrice + this.allServicePrices;
  },

  getRollPec: function () {
    return this.fullPrice * (this.rollback / 100);
  },

  // Функция возвращает итоговую стоимость за вычетом процента отката.
  getServicePercentPrices: function () {
    return Math.ceil(this.fullPrice - this.rollPec);
  },

  // Функция возвращает скидку.
  getRollbackMessage: function (price) {
    if (price > 30000) {
      return "Даем скидку в 10%";
    } else if (price > 15000 && price <= 30000) {
      return "Даем скидку в 5%";
    } else if (price > 0 && price <= 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },

  // Функция проверки типа переменных
  showTypeOf: function (variable) {
    console.log(`${variable}:`, typeof variable);
  },

  // --Блок вывода в консоль--
  logger: function () {
    for (const key in appData) {
      console.log("Ключ: " + key + " значение: " + appData[key]);
    }
  },

  // --Блок функционала--
  start: function () {
    this.getTitle();
    this.getScreens();
    this.getScreenPrice();
    this.getAdaptive;
    this.getAllServicePrices();
    this.fullPrice = this.getFullPrice();
    this.rollPec = this.getRollPec();
    this.servicePercentPrice = this.getServicePercentPrices();
    this.logger();
  },
};
appData.start();
