"use strict";

const title = document.getElementById("title");
let screenBlock = document.querySelector(".screen");
const screenButton = document.querySelector("button[class='screen-btn']");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const cmsItem = document.querySelector(".cms");
const cmsInputOpen = cmsItem.querySelector("input[type='checkbox']");
const hiddenCmsVariants = cmsItem.querySelector(".hidden-cms-variants");
const cmsSelect = hiddenCmsVariants.querySelector("select[name='views-select']");
const mainControlInput = hiddenCmsVariants.querySelector(".main-controls__input");
const mainControlsRange = document.querySelector(".main-controls__range");
const range = mainControlsRange.querySelector("input[type='range']");
const rangeValue = mainControlsRange.querySelector("span[class='range-value']");

const total = document.getElementById("total");
const totalCount = document.getElementById("total-count");
const totalCountOther = document.getElementById("total-count-other");
const totalFullCount = document.getElementById("total-full-count");
const totalCountRollback = document.getElementById("total-count-rollback");

const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

let appData = {
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
  percentWork: 0,

  getHead: function () {
    document.title = title.innerText;
  },

  getScreenBlock: function () {
    return document.querySelectorAll(".screen");
  },

  clearScreenBlock: function (screenBlock) {
    screenBlock.querySelector("select").selectedIndex = 0;
    screenBlock.querySelector("input").value = "";
  },

  addEventScreenBlock: function () {
    this.valid();
  },

  addScreenBlock: function () {
    screenBlock = appData.getScreenBlock();
    const cloneBlock = screenBlock[screenBlock.length - 1].cloneNode(true);
    appData.clearScreenBlock(cloneBlock);
    screenBlock[screenBlock.length - 1].after(cloneBlock);
    appData.addEventScreenBlock();
  },

  resetScreenBlocks: function () {
    screenBlock = appData.getScreenBlock();
    screenBlock.forEach((screen) => {
      this.clearScreenBlock(screen);
    });
  },

  deleteScreenBlocks: function () {
    screenBlock = appData.getScreenBlock();
    screenBlock.forEach((screen, index) => {
      if (index !== 0) {
        screen.remove();
      }
      screenBlock = screen;
    });
  },

  disabledScreenBlocks: function (disabled) {
    screenBlock = appData.getScreenBlock();
    screenBlock.forEach((screen) => {
      screen.querySelector("select").disabled = disabled;
      screen.querySelector("input").disabled = disabled;
    });
  },

  clearInputRange: function () {
    range.value = 0;
    rangeValue.innerText = 0 + "%";
  },

  addInputRange: function (e) {
    appData.rollback = +e.target.value;
    rangeValue.innerText = e.target.value + "%";
    appData.getServicePercentPrice();
  },

  clearCmsInputOpen: function () {
    cmsSelect.selectedIndex = 0;
    this.clearControlsInput(mainControlInput);
  },

  addCmsInputOpen: function (e) {
    if (e.target.checked === true) {
      hiddenCmsVariants.style.display = "flex";
    } else {
      hiddenCmsVariants.style.display = "none";
      appData.clearCmsInputOpen();
    }
  },

  resetCmsInputOpen: function () {
    cmsInputOpen.checked = false;
    hiddenCmsVariants.style.display = "none";
    appData.clearCmsInputOpen();
  },

  disabledCmsInputOpen: function (disabled) {
    cmsInputOpen.disabled = disabled;
  },

  disabledHiddenCmsVariants: function (disabled) {
    cmsSelect.disabled = disabled;
    hiddenCmsVariants.querySelector("input[type='text']").disabled = disabled;
  },

  clearControlsInput: function (block) {
    block.querySelector("input[type='text']").value = "";
    block.style.display = "none";
  },

  addCmsSelect: function (e) {
    if (e.target.selectedIndex === 2) {
      mainControlInput.style.display = "flex";
    } else {
      mainControlInput.style.display = "none";
      appData.clearControlsInput(mainControlInput);
    }
  },

  clearTotal: function () {
    appData.screenPrice = 0;
    appData.totalCount = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
    appData.percentWork = 0;
    total.value = 0;
    totalCount.value = 0;
    totalFullCount.value = 0;
    totalCountOther.value = 0;
    totalCountRollback.value = 0;
  },

  resetCheckbox: function (listCheckbox, checked) {
    listCheckbox.forEach((checkbox) => {
      checkbox.querySelector("input[type='checkbox']").checked = checked;
    });
  },

  disabledCheckbox: function (listCheckbox, disabled) {
    listCheckbox.forEach((checkbox) => {
      checkbox.querySelector("input[type='checkbox']").disabled = disabled;
    });
  },

  addScreens: function () {
    this.screens = [];
    screenBlock = this.getScreenBlock();
    screenBlock.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const selectName = select.options[select.selectedIndex].innerText;
      const input = screen.querySelector("input");
      this.screens.push({
        id: index,
        screen: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addServicePercent: () => {
    appData.servicesPercent = {};
    otherItemsPercent.forEach((item) => {
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
    otherItemsNumber.forEach((item) => {
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

  getPercentWork: function () {
    if (cmsInputOpen.checked === true) {
      let input = 0;
      if (cmsSelect.value === "50") {
        input = +cmsSelect.value / 100;
      }
      if (cmsSelect.value === "other") {
        if (input !== "") {
          input = +mainControlInput.querySelector("input[type='text']").value / 100;
        }
      }
      this.percentWork = input;
    }
  },

  addPrices: function () {
    for (const screen of this.screens) {
      this.screenPrice += screen.price;
    }
    this.screenPrice = this.screenPrice + this.screenPrice * this.percentWork;

    for (const screen of this.screens) {
      this.totalCount += screen.count;
    }

    for (const key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (const key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.totalCount;
    totalFullCount.value = this.fullPrice;
    totalCountOther.value = this.servicePricesNumber + this.servicePricesPercent;
    totalCountRollback.value = this.servicePercentPrice;
  },

  eventStart: function () {
    appData.creatStyleButton(startButton, true, "#f0f0f0");
    appData.creatDisplayButton(startButton, "none");
    appData.creatStyleButton(resetButton, false, "#A52A2A");
    appData.creatDisplayButton(resetButton, "block");
  },

  getServicePercentPrice: function () {
    this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
    totalCountRollback.value = this.servicePercentPrice;
  },

  start: function (e) {
    appData.eventStart();
    appData.disabledScreenBlocks(true);
    appData.creatStyleButton(screenButton, true, "#f0f0f0");
    appData.disabledCheckbox(otherItemsPercent, true);
    appData.disabledCheckbox(otherItemsNumber, true);
    appData.disabledCmsInputOpen(true);
    appData.disabledHiddenCmsVariants(true);
    appData.addScreens();
    appData.addService();
    appData.getPercentWork();
    appData.addPrices();
    appData.showResult();
    appData.getServicePercentPrice();
  },

  eventReset: function () {
    appData.creatStyleButton(resetButton, true, "#f0f0f0");
    appData.creatDisplayButton(resetButton, "none");
    appData.creatStyleButton(resetButton, true, "#f0f0f0");
    appData.creatDisplayButton(startButton, "block");
  },

  reset: function (e) {
    appData.eventReset();
    appData.resetScreenBlocks();
    appData.deleteScreenBlocks();
    appData.disabledScreenBlocks(false);
    appData.resetCheckbox(otherItemsPercent);
    appData.resetCheckbox(otherItemsNumber);
    appData.disabledCheckbox(otherItemsPercent, false);
    appData.disabledCheckbox(otherItemsNumber, false);
    appData.disabledCmsInputOpen(false);
    appData.disabledHiddenCmsVariants(false);
    appData.creatStyleButton(screenButton, false, "#A52A2A");
    appData.resetCmsInputOpen();
    appData.clearInputRange();
    appData.clearTotal();
  },

  addEventButtons: function () {
    screenButton.addEventListener("click", this.addScreenBlock);
    range.addEventListener("input", this.addInputRange);
    cmsInputOpen.addEventListener("change", this.addCmsInputOpen);
    cmsSelect.addEventListener("change", this.addCmsSelect);
    startButton.addEventListener("click", this.start);
    resetButton.addEventListener("click", this.reset);
  },

  isFiniteOrNull: function (num) {
    if (isNaN(num)) {
      return true;
    } else {
      return false;
    }
  },

  inputChange: function (e) {
    let number = e.target.value;
    if (!!appData.isFiniteOrNull(number)) {
      e.target.value = "";
    }
    appData.valid();
  },

  creatStyleButton: function (button, disabled, color) {
    button.disabled = disabled;
    button.style.backgroundColor = color;
  },

  creatDisplayButton: function (button, display) {
    button.style.display = display;
  },

  valid: function () {
    screenBlock = appData.getScreenBlock();
    for (let i = 0; i < screenBlock.length; i++) {
      const screen = screenBlock[i];
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      select.addEventListener("change", this.valid);
      input.addEventListener("input", this.inputChange);
      if (+select.value === 0 || +input.value === 0 || select.value === "") {
        appData.creatStyleButton(startButton, true, "#f0f0f0");
        break;
      } else {
        appData.creatStyleButton(startButton, false, "#A52A2A");
      }
    }
  },

  init: function () {
    this.getHead();
    this.addEventButtons();
    this.valid();
  },
};

appData.init();
