import { Utils } from "../utils/utils";

export class SearchMainView {
  render(root: HTMLElement) {
    let template = ``;

    const header = Utils.create<HTMLDivElement>(
      "filtered-products__header",
      "div"
    );

    template += `
                    <div class="filtered-products__layouts layouts">
                        <div class="layouts__buttons">
                            <button class="button button--icon" id="rows">
                                <span class="icon icon--rows"></span>
                            </button>
                            <button class="button button--icon button--icon-active" id="columns">
                                <span class="icon icon--columns"></span>
                            </button>
                        </div>
                    </div>

                    <div class="filtered-products__search search">
                        <form class="search__form" action="#">
                            <input class="search__input" type="text" placeholder="Search products" name="search">
                            <button class="search__button" type="submit">
                                <span class="icon icon--search"></span>
                            </button>
                        </form>
                    </div>

                    <div class="filtered-products__sort-by sort-by">
                        <label for="sort-by">Sorting By</label>
                        <select id="sort-by" class="sort-by__select" name="sort-by">
                            <option value="price-low-to-high" selected>Price: Low to High</option>
                            <option value="price-high-to-low">Price: High to Low</option>
                            <option value="rating-high-to-low">Rating: High to Low</option>
                            <option value="rating-high-to-low">Rating: Low to High</option>
                        </select>
                    </div>`;

    header.innerHTML = template;

    root.append(header);
  }
}
