import { ExtendedElement, Utils } from "../../utils/utils";
import { RangeSlider } from "../../utils/rangeSlider";
import { Controller } from "controller";
import { Model } from "model";

export class FilterView {
  constructor(private controller: Controller, private model: Model) {}

  render(root: ExtendedElement) {
    const filter = Utils.create<HTMLElement>("filter", "section");
    root.append(filter);

    this.fill();
  }

  fill() {
    this.fillFilters();
    this.insertSliders();
    this.addHandlers();
  }

  fillFilters() {
    let template = ``;
    if (this.model.categories.length) {
      template += this.addCategories();
    }

    if (this.model.brands.length) {
      template += this.addBrands();
    }

    template += this.addFilters();

    (Utils.id(".filter") as ExtendedElement).html(
      `<div class="filter__wrapper">${template}</div>`
    );
  }

  private addFilters() {
    return `
      <div class="filter__price price-filter ">
        <div class="price-filter__wrapper">
            <h3 class="price-filter__title title">Price</h3>
        </div>
      </div>

      <div class="filter__stock stock-filter">
        <div class="stock-filter__wrapper">
            <h3 class="stock-filter__title title">Stock</h3>
        </div>
      </div>

      <div class="filter__buttons">
        <button class="button button--rounded button--bordered button-reset">Reset</button>
        <button class="button button--rounded button--bordered button-copy">Copy link</button>
      </div>
    `;
  }

  private addCategories() {
    let template = `
      <div class="filter__categories categories-filter">
        <h3 class="categories-filter__title title">Categories</h3>
        <ul class="categories-filter__list filter-list">
    `;

    this.model.categories.forEach(({ id, checked, name }) => {
      template += `
          <li class="categories-filter__item filter-list__item">
            <input 
              type="checkbox" 
              class="filter-list__item-check filter__categorie-item" 
              data-id="${id}"
              id="categories-${id}"
              ${checked ? "checked" : ""}
            >
            <label 
              class="filter-list__item-label" 
              for="categories-${id}">
              ${name}
            </label>
          </li>`;
    });

    template += `
        </ul>
      </div>
    `;

    return template;
  }

  private addBrands() {
    let template = `
      <div class="filter__brands brands-filter">
        <h3 class="brands-filter__title title">Brands</h3>
        <ul class="brands-filter__list filter-list">
    `;

    this.model.brands.forEach(({ id, checked, name }) => {
      template += `
          <li class="brands-filter__item filter-list__item">
            <input 
              type="checkbox" 
              class="filter-list__item-check filter__brand-item" 
              data-id="${id}"
              id="brands-${id}" 
              ${checked ? "checked" : ""}
            >
            <label 
              class="filter-list__item-label" 
              for="brands-${id}">
              ${name}
            </label>
          </li>`;
    });

    template += `
        </ul>
      </div>
    `;

    return template;
  }

  insertSliders() {
    const priceRange = Utils.id(".price-filter__wrapper") as ExtendedElement;
    priceRange.html('<h3 class="price-filter__title title">Price</h3>');
    const priceRangeSlider = new RangeSlider(
      this.model,
      this.controller,
      "price"
    );
    priceRange.append(priceRangeSlider.buildRangeSlider());

    const stockRange = Utils.id(".stock-filter__wrapper") as ExtendedElement;
    stockRange.html('<h3 class="price-filter__title title">Stock</h3>');
    const stockRangeSlider = new RangeSlider(
      this.model,
      this.controller,
      "stock"
    );
    stockRange.append(stockRangeSlider.buildRangeSlider());
  }

  addHandlers() {
    for (const category of Utils.id(
      ".filter__categorie-item"
    ) as NodeListOf<ExtendedElement>) {
      Utils.addEvent(category, "click", () =>
        this.controller.changeFilterCategory(
          category.checked!,
          +category.dataset!.id
        )
      );
    }

    for (const brand of Utils.id(
      ".filter__brand-item"
    ) as NodeListOf<ExtendedElement>) {
      Utils.addEvent(brand, "click", () =>
        this.controller.changeFilterBrand(brand.checked!, +brand.dataset!.id)
      );
    }

    Utils.addEvent(".button-reset", "click", () => {
      this.controller.resetFilter();
      this.fill();
    });

    Utils.addEvent(".button-copy", "click", () => {
      navigator.clipboard.writeText(window.location.href);
    });
  }
}
