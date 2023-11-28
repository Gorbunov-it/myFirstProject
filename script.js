"use strict";

let appData = {
  //--Блок описание свойств--
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  services: {},
  allServicePrices: 0,
  servicePercentPrice: 0,
  fullPrice: 0,
  rollPec: 0,
  rollback: 10,
  _regExp: /\s*(?:;|$)\s*/,

  //--Блок описание методов--

  // Метод проверки строки
  stringOrNumber: function (str) {
    if (isNaN(str)) {
      return true;
    } else {
      return false;
    }
  },

  // Метод проверки числа
  isFiniteOrNull: function (num) {
    if (num !== null && num.trim() !== "") {
      return isFinite(num.trim().replace(",", ".").trim());
    } else {
      return false;
    }
  },

  // Метод изменяет и возвращает title
  // Пример: " КаЛьКулятор Верстки" - > "Калькулятор верстки"
  changeTitle: function (value) {
    value = value.trim().toLocaleLowerCase();
    this.title = value.charAt(0).toUpperCase() + value.slice(1);
  },

  //Метод получения название проекта
  getTitle: function () {
    do {
      this.title = prompt("Как называется ваш проект?");
    } while (!this.stringOrNumber(this.title));
    this.changeTitle(this.title);
  },

  //Метод изменение Типа экрана
  changeScreens: function (screens) {
    return screens.trim().toLowerCase();
  },

  // Метод получения Типа экрана
  getScreen: function () {
    let screens = "";
    do {
      screens = prompt("Какие типы экранов нужно разработать?");
    } while (!this.stringOrNumber(screens));
    return this.changeScreens(screens);
  },

  //Метод преобразования числа с плавующей запятой в точку
  convertStrInNumber: function (variable) {
    return parseFloat(variable.replace(",", ".").trim());
  },

  // Метод получения стоимости
  getScreenPrice: function () {
    let screenPrice = 0;
    do {
      screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!this.isFiniteOrNull(screenPrice));
    return this.convertStrInNumber(screenPrice);
  },

  // Метод сохранения всех типов Экранов и суммы
  getAllScreensPrices: function () {
    for (let i = 0; i < 2; i++) {
      let screen = this.getScreen();
      let price = this.getScreenPrice();
      appData.screens.push({ id: i, screen: screen, price: price });
    }
  },

  // Метод суммирования всех сумм за титы экранов
  summAllScreenPrices: function (summ, item) {
    let result = summ + item.price;
    return result;
  },

  // Метод получения всех сумм за титы экранов
  getSummAllScreenPrices: function () {
    this.screenPrice = appData.screens.reduce(this.summAllScreenPrices, 0);
  },

  //ТЕСТИРОВАНИЕ
  // getSummAllScreenPrices: function () {
  //   for (const key in appData.screens) {
  //     if (Object.hasOwnProperty.call(appData.screens, key)) {
  //       appData.screenPrice += appData.screens[key].price;
  //     }
  //   }
  // },

  //  Метод получения услуги
  getService: function () {
    let service = "";
    do {
      service = prompt("Какой дополнительный тип услуги нужен ?");
    } while (!this.stringOrNumber(service));
    return service;
  },

  //  Метод получения стоимости за услугу
  getServicePrice: function () {
    let servicePrice = 0;
    do {
      servicePrice = prompt("Сколько это будет стоить ?");
    } while (!this.isFiniteOrNull(servicePrice));
    return this.convertStrInNumber(servicePrice);
  },

  //  Метод получения всех дополнительных услуг и их цен.
  getAllServiceAndPrices: function () {
    debugger;
    for (let i = 0; i < 2; i++) {
      let service = this.getService();
      let servicePrice = this.getServicePrice();
      appData.services[`${service}${i}`] = servicePrice;
    }
  },

  // Метод получения тип адаптива
  getAdaptive: function () {
    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  // Метод возвращает сумму всех дополнительных услуг.
  getSummServicePrice: function () {
    for (const key in appData.services) {
      appData.allServicePrices += appData.services;
    }
  },

  // Метод возвращает сумму стоимости верстки и стоимости дополнительных услуг
  getFullPrice: function () {
    this.fullPrice = this.screenPrice + this.allServicePrices;
  },

  getRollPec: function () {
    this.rollPec = this.fullPrice * (this.rollback / 100);
  },

  // Метод возвращает итоговую стоимость за вычетом процента отката.
  getServicePercentPrices: function () {
    this.servicePercentPrice = Math.ceil(this.fullPrice - this.rollPec);
  },

  // Метод возвращает скидку.
  getRollbackMessage: function (price) {
    if (price > 30000) {
      console.log("Даем скидку в 10%");
    } else if (price > 15000 && price <= 30000) {
      console.log("Даем скидку в 5%");
    } else if (price > 0 && price <= 15000) {
      console.log("Скидка не предусмотрена");
    } else {
      console.log("Что то пошло не так");
    }
  },

  // Метод проверки типа переменных
  showTypeOf: function (variable) {
    console.log(typeof variable, `${variable}:`);
  },

  // --Блок вывода в консоль--
  logger: function () {
    for (const key in appData) {
      console.log("Ключ: " + key + " значение: " + appData[key]);
    }
  },

  //Метод запуска проекта
  start: function () {
    this.getTitle();
    this.getAllScreensPrices();
    this.getSummAllScreenPrices();
    this.getAllServiceAndPrices();
    this.getSummServicePrice();
    this.getFullPrice();
    this.getRollPec();
    this.getServicePercentPrices();
    this.getRollbackMessage(this.fullPrice);
    this.showTypeOf(this.title);
    this.showTypeOf(this.fullPrice);
    this.showTypeOf(this.adaptive);
    this.logger();
  },
};

appData.start();
