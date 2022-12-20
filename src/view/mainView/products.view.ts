import { Product } from "store";
import { Utils } from "../../utils/utils";

export class ProductsView {
    render(products: Product[], layout: string, root: HTMLElement) {
        root.innerHTML = "";

        const productsWrapper = Utils.create<HTMLDivElement>(
            `products__wrapper layout-${layout}`,
            "div"
        );

        products.forEach(
            ({ id, title, price, discountPercentage, brand, rating, stock, category, thumbnail, show }) => {
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
                    <span class="product-item__price-default">${price}₽</span>
                    <span class="product-item__price-discount">${(price - ((price / 100) * discountPercentage)).toFixed(2)}₽</span>
                </div>
                <div class="product-item__info">
                    <span class="product-item__category">
                        Category: ${category.name}
                    </span>
                    <span class="product-item__brand">
                        Brand: ${brand.name}
                    </span>
                    <span class="product-item__stock">
                        Stock: ${stock}
                    </span>
                    <span class="product-item__rating">
                        Rating: ${rating}
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

       if (productsWrapper.innerHTML === '') {
           productsWrapper.innerHTML = `<span class="products__empty">
                                            No results found, please modify your search criteria.
                                        </span>`
       }

        root.append(productsWrapper);
    }
}
