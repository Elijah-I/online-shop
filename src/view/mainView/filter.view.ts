import { ExtendedElement, Utils } from "../../utils/utils";
import { RangeSlider } from "../../utils/rangeSlider";
import { Brand, Category } from "store/index";

export class FilterView {
  constructor(private brands: Brand[], private categories: Category[]) {}

  render(root: ExtendedElement) {
    const filter = Utils.create<HTMLElement>("filter", "section");
    let template = ``;

    if (this.categories.length) {
      template += this.addCategories();
    }

    if (this.brands.length) {
      template += this.addBrands();
    }

    template += this.addFilters();

    filter.innerHTML = `<div class="filter__wrapper">${template}</div>`;

    root.append(filter);

    this.insertSliders();
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
        <button class="button button--rounded button--bordered">Reset</button>
        <button class="button button--rounded button--bordered">Copy link</button>
      </div>
    `;
  }

  private addCategories() {
    let template = `
      <div class="filter__categories categories-filter">
        <h3 class="categories-filter__title title">Categories</h3>
        <ul class="categories-filter__list filter-list">
    `;

    this.categories.forEach(({ id, checked, name }) => {
      template += `
          <li class="categories-filter__item filter-list__item">
            <input 
              type="checkbox" 
              class="filter-list__item-check" 
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

    this.brands.forEach(({ id, checked, name }) => {
      template += `
          <li class="brands-filter__item filter-list__item">
            <input 
              type="checkbox" 
              class="filter-list__item-check" 
              data-label-for="brands" 
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
    const priceRangeSlider = new RangeSlider([
      "price-range-from",
      "price-range-to",
      "price-input-from",
      "price-input-to"
    ]);
    priceRange.append(priceRangeSlider.buildRangeSlider());

    const stockRange = Utils.id(".stock-filter__wrapper") as ExtendedElement;
    const stockRangeSlider = new RangeSlider([
      "stock-range-from",
      "stock-range-to",
      "stock-input-from",
      "stock-input-to"
    ]);
    stockRange.append(stockRangeSlider.buildRangeSlider());
  }
}
