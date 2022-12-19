import { Product } from "store";
import { Utils } from "../../utils/utils";

interface JSONObject {
  [x: string]: string | number | JSONObject | JSONObject[];
}

export class ProductsView {
  render(products: Product[], root: HTMLElement) {
    root.innerHTML = "";

    const productsWrapper = Utils.create<HTMLDivElement>(
      "products__wrapper layout-3-columns",
      "div"
    );

    products.forEach(
      ({ id, title, price, brand, category, thumbnail, show }) => {
        let template = ``;

        if (show)
          template += `
          <div class="products__item product-item" id="${id}">
            <div class="product-item__img">
                <img src="${thumbnail}" alt="Product Item" width="240" height="248">
            </div>
            <div class="product-item__content">
                <h4 class="product-item__title title">${title}</h4>
                <div class="product-item__price">
                    <span class="product-item__price-default">${price}$</span>
                    <span class="product-item__price-discount">${price}$</span>
                </div>
                <div class="product-item__info">
                    <span class="product-item__category">
                        Category: ${(category as JSONObject).name}
                    </span>
                    <span class="product-item__brand">
                        Brand: ${(brand as JSONObject).name}
                    </span>
                </div>
                <div class="product-item__button">
                    <button class="button button--rounded button--bordered">Add to cart</button>
                </div>
            </div>
          </div>
        `;

        productsWrapper.innerHTML += template;
      }
    );

    root.append(productsWrapper);
  }
}
