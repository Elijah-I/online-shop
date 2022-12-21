import { Product } from "store";
import { Controller } from "controller";
import { Utils, ExtendedElement } from "../../utils/utils";
import {headStyle} from "../../utils/headStyle";

export class ProductsView {
  constructor(private controller: Controller) {}

  render(products: Product[], layout: string, root: HTMLElement) {
    root.innerHTML = "";
    headStyle.clearHeadStyle();
    const headStyleInner = headStyle.getHeadStyle();

    const productsWrapper = Utils.create<HTMLDivElement>(
      `products__wrapper layout-${layout}`,
      "div"
    );

    products.forEach(
      ({
        id,
        title,
        price,
        discountPercentage,
        brand,
        rating,
        stock,
        category,
        thumbnail,
        show,
        cart
      }) => {
        let template = ``;
        const classNM = `products__item product-item${
          cart ? " product-item--carted" : ""
        }`;
        const buttonText = cart ? "Remove from cart" : "Add to cart";

        if (show)
          template += `
          <div class="${classNM}" data-id=${id} id="product-${id}">
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
                        <span class="product-item__price-discount">${(
                          price -
                          (price / 100) * discountPercentage
                        ).toFixed(2)}₽</span>
                    </div>
                </div>
                <div class="product-item__rating-buy">
                    <span class="product-item__rating" id="rating-${id}">
                        ${rating}
                    </span>
                    <div class="product-item__button">
                      <button data-id=${id} class="button button--rounded button--bordered button__add">${buttonText}</button>
                    </div>
                </div>  
            </div>
          </div>
        `;
        productsWrapper.innerHTML += template;
        headStyleInner.innerHTML += `#rating-${id}:before {
                content: '★★★★★';
                letter-spacing: 3px;
                background: linear-gradient(90deg, #fc0 ${
                  (rating / 5) * 100
                }%, #fff ${(rating / 5) * 100}%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;}\n`;
      }
    );

    root.append(productsWrapper);

    this.addHandlers();
  }

  applyCart(cartIds: number[]) {
    for (const product of Utils.id(
      ".product-item"
    ) as NodeListOf<ExtendedElement>) {
      product.class("product-item--carted", true);
      (
        Utils.id(
          `#product-${product.dataset!.id} .button__add`
        ) as ExtendedElement
      ).html("add to cart");
    }

    for (const cartId of cartIds) {
      const product = Utils.id(`#product-${cartId}`);

      if (product !== null) {
        (product as ExtendedElement).class("product-item--carted");

        (Utils.id(`#product-${cartId} .button__add`) as ExtendedElement).html(
          "remove from cart"
        );
      }
    }
  }

  private addHandlers() {
    for (const button of Utils.id(
      ".button__add"
    ) as NodeListOf<ExtendedElement>) {
      Utils.addEvent(button, "click", () => {
        this.controller.toggleCart(+button.dataset!.id);
      });
    }
  }
}
