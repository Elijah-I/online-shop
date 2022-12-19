import { Controller } from "controller";
import { Model } from "model";

export class RangeSlider {
  arrOfId: string[];
  wrapper: HTMLElement;
  controls: HTMLElement;
  rangeControlFrom: HTMLInputElement;
  rangeControlTo: HTMLInputElement;
  values: HTMLElement;
  rangeValueFrom: HTMLElement;
  rangeValueTo: HTMLElement;

  constructor(
    private model: Model,
    private controller: Controller,
    private type: string
  ) {
    this.arrOfId = [
      `${this.type}-range-from`,
      `${this.type}-range-to`,
      `${this.type}-input-from`,
      `${this.type}-input-to`
    ];

    this.wrapper = this.createDomNode("div", "range-filter");
    this.controls = this.createDomNode("div", "range-filter__controls");
    this.rangeControlFrom = this.createDomNode("input", "range-filter__range");
    this.rangeControlTo = this.createDomNode("input", "range-filter__range");
    this.values = this.createDomNode("div", "range-filter__values");
    this.rangeValueFrom = this.createDomNode("span", "range-filter__value");
    this.rangeValueTo = this.createDomNode("span", "range-filter__value");
  }

  buildRangeSlider() {
    this.initId();
    this.initInputs();
    this.initDefaultValues();
    this.appendElements();
    this.bindEvents();
    this.fillColorBetween();

    return this.wrapper;
  }

  createDomNode<T extends HTMLElement>(element: string, classes: string): T {
    const node = document.createElement(element);
    node.classList.add(classes);
    return node as T;
  }

  initId() {
    [
      this.rangeControlFrom.id,
      this.rangeControlTo.id,
      this.rangeValueFrom.id,
      this.rangeValueTo.id
    ] = this.arrOfId;
  }

  initInputs() {
    let range = { max: 100, from: 50, to: 80 };
    if (this.type === "price") range = this.model.priceRange;
    if (this.type === "stock") range = this.model.stockRange;

    const { max, from, to } = range;

    this.rangeControlFrom.type = "range";
    this.rangeControlFrom.min = "0";
    this.rangeControlFrom.max = max.toString();
    this.rangeControlFrom.value = from.toString();

    this.rangeControlTo.type = "range";
    this.rangeControlTo.min = "0";
    this.rangeControlTo.max = max.toString();
    this.rangeControlTo.value = to.toString();
  }

  initDefaultValues() {
    let range = { max: 100, from: 50, to: 80 };
    if (this.type === "price") range = this.model.priceRange;
    if (this.type === "stock") range = this.model.stockRange;

    const { from, to } = range;

    this.rangeValueFrom.innerText = from.toString();
    this.rangeValueTo.innerText = to.toString();
  }

  appendElements() {
    this.controls.append(this.rangeControlFrom, this.rangeControlTo);
    this.values.append(this.rangeValueFrom, this.rangeValueTo);
    this.wrapper.append(this.controls, this.values);
  }

  bindEvents() {
    this.rangeControlFrom.addEventListener("input", () =>
      this.controlRangeFrom(
        parseInt(this.rangeControlFrom.value, 10),
        parseInt(this.rangeControlTo.value, 10)
      )
    );

    this.rangeControlTo.addEventListener("input", () =>
      this.controlRangeTo(
        parseInt(this.rangeControlFrom.value, 10),
        parseInt(this.rangeControlTo.value, 10)
      )
    );

    this.rangeControlFrom.addEventListener("mouseup", () => {
      this.applyRange(
        parseInt(this.rangeControlFrom.value, 10),
        parseInt(this.rangeControlTo.value, 10)
      );
    });

    this.rangeControlTo.addEventListener("mouseup", () => {
      this.applyRange(
        parseInt(this.rangeControlFrom.value, 10),
        parseInt(this.rangeControlTo.value, 10)
      );
    });
  }

  applyRange(from: number, to: number) {
    if (this.type === "price") this.controller.changeFilterPrice(from, to);
    if (this.type === "stock") this.controller.changeFilterStock(from, to);
  }

  controlRangeFrom(from: number, to: number) {
    this.fillColorBetween();
    from > to
      ? ([this.rangeControlFrom.value, this.rangeValueFrom.innerHTML] = [
          `${to}`,
          `${to}`
        ])
      : (this.rangeValueFrom.innerHTML = `${from}`);
  }

  controlRangeTo(from: number, to: number) {
    this.fillColorBetween();
    from <= to
      ? ([this.rangeControlTo.value, this.rangeValueTo.innerHTML] = [
          `${to}`,
          `${to}`
        ])
      : ([this.rangeValueTo.innerHTML, this.rangeControlTo.value] = [
          `${from}`,
          `${from}`
        ]);
  }

  fillColorBetween() {
    const distance: number =
      parseInt(this.rangeControlFrom.max) - parseInt(this.rangeControlTo.min);
    const current: number =
      parseInt(this.rangeControlFrom.value) - parseInt(this.rangeControlTo.min);
    const to: number =
      parseInt(this.rangeControlTo.value) - parseInt(this.rangeControlTo.min);
    this.rangeControlTo.style.background = `linear-gradient(
      to right, #C6C6C6 0%,
      #C6C6C6 ${(current / distance) * 100}%,
      #976464 ${(current / distance) * 100}%,
      #976464 ${(to / distance) * 100}%,
      #C6C6C6 ${(to / distance) * 100}%,
      #C6C6C6 100%)`;
  }
}
