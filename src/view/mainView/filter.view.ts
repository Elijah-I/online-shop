import { ExtendedElement, Utils } from "../../utils/utils";
import { RangeSlider } from "../../utils/rangeSlider";
import { State } from "../../store/index";

const stateBrands = State.brands; //TODO call from model
const stateCategories = State.categories; //TODO call from model

export class FilterView {
  render(root: ExtendedElement) {
    let template = ``;
    const filter = Utils.create<HTMLElement>("filter", "section");

    template += `<div class="filter__wrapper">
                        <div class="filter__categories categories-filter">
                            <h3 class="categories-filter__title title">Categories</h3>`;

    if (stateCategories) {
      template += `<ul class="categories-filter__list filter-list">`;
      stateCategories.map(({ id, checked }) => {
        template += `<li class="categories-filter__item filter-list__item">
                        <input 
                          type="checkbox" 
                          class="filter-list__item-check" 
                          id="categories-${id}" 
                          ${checked ? "checked" : ""}
                        >
                        <label 
                          class="filter-list__item-label" 
                          for="categories-${id}">
                          Category
                        </label>
                     </li>`;
      });
      template += `</ul>`;
    }

    template += `</div>`;

    template += `<div class="filter__brands brands-filter">
                            <h3 class="brands-filter__title title">Brands</h3>`;

    if (stateBrands) {
      template += `<ul class="brands-filter__list filter-list">`;
      stateBrands.map(({ id, checked }) => {
        template += `<li class="brands-filter__item filter-list__item">
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
                          Brand
                        </label>
                     </li>`;
      });
      template += `</ul>`;
    }

    template += ` </div>`;

    template += `<div class="filter__price price-filter ">
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
    </div>`;

    filter.innerHTML = template;

    root.append(filter);

    this.addRangeSliderListeners();
  }

  addRangeSliderListeners() {
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
