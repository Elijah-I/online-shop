export class RangeSlider {
  arrOfId: string[];
  wrapper: HTMLElement;
  controls: HTMLElement;
  rangeControlFrom: HTMLInputElement;
  rangeControlTo: HTMLInputElement;
  values: HTMLElement;
  rangeValueFrom: HTMLElement;
  rangeValueTo: HTMLElement;

  constructor(arrOfId: string[]) {
    this.arrOfId = arrOfId;
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
    this.rangeControlFrom.type = "range";
    this.rangeControlFrom.min = "0";
    this.rangeControlFrom.max = "100";
    this.rangeControlFrom.value = "50";

    this.rangeControlTo.type = "range";
    this.rangeControlTo.min = "0";
    this.rangeControlTo.max = "100";
    this.rangeControlTo.value = "80";
  }

  initDefaultValues() {
    this.rangeValueFrom.innerText = "50";
    this.rangeValueTo.innerText = "80";
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
