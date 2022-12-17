import { ExtendedElement, Utils } from "../utils/utils";
import { RangeSlider } from "../utils/rangeSlider";

export class FilterMainView {
  render(root: ExtendedElement) {
    let template = ``;
    const filter = Utils.create<HTMLElement>("filter", "section");

    template = `<div class="filter__wrapper">
                        <div class="filter__categories categories-filter">
                            <h3 class="categories-filter__title title">Categories</h3>
                            <ul class="categories-filter__list filter-list">
                                <li class="categories-filter__item filter-list__item">
                                    <input type="checkbox" class="filter-list__item-check" data-label-for="categories" id="yarn">
                                    <label class="filter-list__item-label" for="yarn">Yarn</label>
                                </li>
                                <li class="categories-filter__item filter-list__item">
                                    <input type="checkbox" class="filter-list__item-check" data-label-for="categories" id="paints">
                                    <label class="filter-list__item-label" for="paints">Paints</label>
                                </li>
                            </ul>
                        </div>
                        <div class="filter__brands brands-filter">
                            <h3 class="brands-filter__title title">Brands</h3>
                            <ul class="brands-filter__list filter-list">
                                <li class="brands-filter__item filter-list__item">
                                    <input type="checkbox" class="filter-list__item-check" data-label-for="brands" id="adelia">
                                    <label class="filter-list__item-label" for="adelia">Adelia</label>
                                </li>
                                <li class="brands-filter__item filter-list__item">
                                    <input type="checkbox" class="filter-list__item-check" data-label-for="brands" id="arachna">
                                    <label class="filter-list__item-label" for="arachna">Arachna</label>
                                </li>
                                <li class="brands-filter__item filter-list__item">
                                    <input type="checkbox" class="filter-list__item-check" data-label-for="brands" id="decola">
                                    <label class="filter-list__item-label" for="decola">Decola</label>
                                </li>
                                <li class="brands-filter__item filter-list__item">
                                    <input type="checkbox" class="filter-list__item-check" data-label-for="brands" id="artista">
                                    <label class="filter-list__item-label" for="artista">Artista</label>
                                </li>
                            </ul>

                        </div>
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
