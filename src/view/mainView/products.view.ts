import { Product } from "store";
import { Utils } from "../../utils/utils";

export class ProductsView {
    render(products: Product[], layout: string, root: HTMLElement) {
        root.innerHTML = "";

        const headStyle = document.getElementsByTagName('style');

        if(headStyle) {
            for (const headStyleElement of headStyle) {
                headStyleElement.parentNode?.removeChild(headStyleElement);
            }
        }

        const headStyleInner = document.head.appendChild(document.createElement("style"));

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
                
                <div class="product-item__info">
                    <div class="product-item__desc">
                        <span class="product-item__category">
                            ${category.name}
                        </span>
                        <span class="product-item__brand">
                            Brand: ${brand.name}
                        </span>
                        <span class="product-item__stock">
                            Stock: ${stock}
                        </span>
                    </div>
                    <div class="product-item__price">
                        <span class="product-item__price-default">${price}₽</span>
                        <span class="product-item__price-discount">${(price - ((price / 100) * discountPercentage)).toFixed(2)}₽</span>
                    </div>
                </div>
                <div class="product-item__rating-buy">
                    <span class="product-item__rating" id="rating-${id}">
                        ${rating}
                    </span>
                    <div class="product-item__button">
                        <button class="button button--rounded button--bordered">Add to cart</button>
                    </div>
                </div>  
            </div>
          </div>
        `;
                productsWrapper.innerHTML += template;
                headStyleInner.innerHTML += `#rating-${id}:before {
                content: '★★★★★';
                letter-spacing: 3px;
                background: linear-gradient(90deg, #fc0 ${rating / 5 * 100}%, #fff ${rating / 5 * 100}%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;}\n`
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
