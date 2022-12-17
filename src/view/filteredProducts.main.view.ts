import { ExtendedElement, Utils } from "../utils/utils";
const img = require("../assets/img/product.jpeg");

export class FilteredProductsMainView {
  render(root: ExtendedElement) {
    let template = ``;
    const filteredProducts = Utils.create<HTMLElement>(
      "filtered-products",
      "section"
    );

    template = `<div class="filtered-products__wrapper">
                        <div class="filtered-products__header">

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
                            </div>
                        </div>
                        <div class="filtered-products__products products">
                            <div class="products__wrapper layout-3-columns">


                                <div class="products__item product-item">
                                    <div class="product-item__img">
                                        <img src="${img}" alt="Product Item" width="240" height="248">
                                    </div>
                                    <div class="product-item__content">
                                        <h4 class="product-item__title title">Adelia "Dolly"</h4>
                                        <div class="product-item__price">
                                            <span class="product-item__price-default">149$</span>
                                            <span class="product-item__price-discount">75$</span>
                                        </div>
                                        <div class="product-item__info">
                                            <span class="product-item__category">Category: Yarn</span>
                                            <span class="product-item__brand">Brand: Adelia</span>
                                        </div>


                                        <div class="product-item__button">
                                            <button class="button button--rounded button--bordered">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="products__item product-item">
                                    <div class="product-item__img">
                                        <img src="${img}" alt="Product Item" width="240" height="248">
                                    </div>
                                    <div class="product-item__content">
                                        <h4 class="product-item__title title">Adelia "Dolly"</h4>
                                        <div class="product-item__price">
                                            <span class="product-item__price-default">149$</span>
                                            <span class="product-item__price-discount">75$</span>
                                        </div>
                                        <div class="product-item__info">
                                            <span class="product-item__category">Category: Yarn</span>
                                            <span class="product-item__brand">Brand: Adelia</span>
                                        </div>


                                        <div class="product-item__button">
                                            <button class="button button--rounded button--bordered">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="products__item product-item">
                                    <div class="product-item__img">
                                        <img src="${img}" alt="Product Item" width="240" height="248">
                                    </div>
                                    <div class="product-item__content">
                                        <h4 class="product-item__title title">Adelia "Dolly"</h4>
                                        <div class="product-item__price">
                                            <span class="product-item__price-default">149$</span>
                                            <span class="product-item__price-discount">75$</span>
                                        </div>
                                        <div class="product-item__info">
                                            <span class="product-item__category">Category: Yarn</span>
                                            <span class="product-item__brand">Brand: Adelia</span>
                                        </div>


                                        <div class="product-item__button">
                                            <button class="button button--rounded button--bordered">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="products__item product-item">
                                    <div class="product-item__img">
                                        <img src="${img}" alt="Product Item" width="240" height="248">
                                    </div>
                                    <div class="product-item__content">
                                        <h4 class="product-item__title title">Adelia "Dolly"</h4>
                                        <div class="product-item__price">
                                            <span class="product-item__price-default">149$</span>
                                            <span class="product-item__price-discount">75$</span>
                                        </div>
                                        <div class="product-item__info">
                                            <span class="product-item__category">Category: Yarn</span>
                                            <span class="product-item__brand">Brand: Adelia</span>
                                        </div>


                                        <div class="product-item__button">
                                            <button class="button button--rounded button--bordered">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="products__item product-item">
                                    <div class="product-item__img">
                                        <img src="${img}" alt="Product Item" width="240" height="248">
                                    </div>
                                    <div class="product-item__content">
                                        <h4 class="product-item__title title">Adelia "Dolly"</h4>
                                        <div class="product-item__price">
                                            <span class="product-item__price-default">149$</span>
                                            <span class="product-item__price-discount">75$</span>
                                        </div>
                                        <div class="product-item__info">
                                            <span class="product-item__category">Category: Yarn</span>
                                            <span class="product-item__brand">Brand: Adelia</span>
                                        </div>


                                        <div class="product-item__button">
                                            <button class="button button--rounded button--bordered">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="products__item product-item">
                                    <div class="product-item__img">
                                        <img src="${img}" alt="Product Item" width="240" height="248">
                                    </div>
                                    <div class="product-item__content">
                                        <h4 class="product-item__title title">Adelia "Dolly"</h4>
                                        <div class="product-item__price">
                                            <span class="product-item__price-default">149$</span>
                                            <span class="product-item__price-discount">75$</span>
                                        </div>
                                        <div class="product-item__info">
                                            <span class="product-item__category">Category: Yarn</span>
                                            <span class="product-item__brand">Brand: Adelia</span>
                                        </div>


                                        <div class="product-item__button">
                                            <button class="button button--rounded button--bordered">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

    filteredProducts.innerHTML = template;

    root.append(filteredProducts);
  }
}
