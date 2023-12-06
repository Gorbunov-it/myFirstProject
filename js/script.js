"use strict";

const title = document.getElementById("title");
const startButton = document.getElementById("start");
let screenBlock = document.querySelector(".screen");
const other_tems_percent = document.querySelectorAll(".other-items.percent");
const other_tems_number = document.querySelectorAll(".other-items.number");
const screenButton = document.querySelector(".screen-btn");
const range = document.querySelector("input[type='range']");
const rangeValue = document.querySelector("span[class='range-value']");

const total = document.getElementById("total");
const totalCount = document.getElementById("total-count");
const totalCountOther = document.getElementById("total-count-other");
const totalFullCount = document.getElementById("total-full-count");
const totalCountRollback = document.getElementById("total-count-rollback");

let appData = {
  //--Блок описание свойств--
  title: "",
  screens: [],
  servicesPercent: {},
  servicesNumber: {},
  screenPrice: 0,
  servicePricesNumber: 0,
  servicePricesPercent: 0,
  servicePercentPrice: 0,
  fullPrice: 0,
  totalCount: 0,
  rollback: 0,

  //--Блок описание методов--

  getTitle: function () {
    document.title = title.innerText;
  },

  getScreenBlock: () => {
    return document.querySelectorAll(".screen");
  },

  resetSceebBlock: (block) => {
    const select = block.querySelector("select");
    const input = block.querySelector("input");
    select.options[0];
    input.value = "";
  },

  isFiniteOrNull: (num) => {
    if (isNaN(num)) {
      return true;
    } else {
      return false;
    }
  },

  valid: () => {
    screenBlock = appData.getScreenBlock();
    screenBlock.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (+select.value === 0 || +input.value === 0 || select.value === "") {
        startButton.style.disabled = "true";
        startButton.style.backgroundColor = "#f0f0f0";
      } else {
        startButton.style.disabled = "false";
        startButton.style.backgroundColor = "#A52A2A";
      }
      select.addEventListener("change", appData.valid);
      input.addEventListener("input", appData.inputChange);
    });
  },

  addSceebBlock: () => {
    screenBlock = appData.getScreenBlock();
    const cloneBlock = screenBlock[screenBlock.length - 1].cloneNode(true);
    appData.resetSceebBlock(cloneBlock);
    screenBlock[screenBlock.length - 1].after(cloneBlock);
    appData.valid();
  },

  addScreens: () => {
    appData.screens = [];
    screenBlock = appData.getScreenBlock();
    screenBlock.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const selectName = select.options[select.selectedIndex].innerText;
      const input = screen.querySelector("input");
      appData.screens.push({
        id: index,
        screen: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addServicePercent: () => {
    appData.servicesPercent = {};
    other_tems_percent.forEach((item) => {
      const check = item.querySelector("input[type='checkbox']");
      const label = item.querySelector("label");
      const inputText = item.querySelector("input[type='text']");
      if (check.checked) {
        appData.servicesPercent[label.innerText] = +inputText.value;
      }
    });
  },

  addServiceNumber: () => {
    appData.servicesNumber = {};
    other_tems_number.forEach((item) => {
      const check = item.querySelector("input[type='checkbox']");
      const label = item.querySelector("label");
      const inputText = item.querySelector("input[type='text']");
      if (check.checked) {
        appData.servicesNumber[label.innerText] = +inputText.value;
      }
    });
  },

  addService: () => {
    appData.addServicePercent();
    appData.addServiceNumber();
  },

  addPrices: () => {
    for (const screen of appData.screens) {
      appData.screenPrice += screen.price;
    }

    for (const screen of appData.screens) {
      appData.totalCount += screen.count;
    }

    for (const key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (const key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
  },

  resetResult: () => {
    appData.screenPrice = 0;
    appData.totalCount = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
    total.value = "";
    totalCount.value = "";
    totalFullCount.value = "";
    totalCountOther.value = "";
    totalCountRollback.value = "";
  },

  showResult: () => {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesNumber + appData.servicePricesPercent;
    totalFullCount.value = appData.fullPrice;
    totalCount.value = appData.totalCount;
    totalCountRollback.value = appData.servicePercentPrice;
  },

  inputRangeValue: (e) => {
    rangeValue.innerText = e.target.value + "%";
    appData.rollback = +e.target.value;
  },

  inputChange: (e) => {
    let number = e.target.value;
    if (!!appData.isFiniteOrNull(number)) {
      e.target.value = "";
    }
    appData.valid();
  },

  start: () => {
    appData.addScreens();
    appData.addService();
    appData.resetResult();
    appData.addPrices();
    appData.showResult();
  },

  init: () => {
    appData.getTitle();
    appData.valid();
    startButton.addEventListener("click", appData.start);
    screenButton.addEventListener("click", appData.addSceebBlock);
    range.addEventListener("input", appData.inputRangeValue);
  },
};

appData.init();
