import { ExtendedElement, Utils } from "../../utils/utils";
import { Controller } from "../../controller";
import { Model } from "../../model";
import { Product } from "../../store";
import { headStyle } from "../../utils/headStyle";
import { SearchParams } from "types/searchParams";

export class ProductView {
  productRoot: HTMLElement;
  breadcrumbsNav: HTMLElement;
  productWrapper: HTMLElement;

  constructor(
    private controller: Controller,
    private model: Model,
    private root: ExtendedElement
  ) {
    this.productRoot = Utils.create<HTMLElement>("product", "section");
    this.breadcrumbsNav = Utils.create<HTMLElement>("breadcrumbs-nav", "div");
    this.productWrapper = Utils.create<HTMLElement>("product__wrapper", "div");
  }

  render(id: string) {
    this.root.html("");

    for (let i = 0; i < this.model.products.length; i++) {
      if (this.model.products[i].id === parseInt(id)) {
        this.fill(this.model.products[i]);
        break;
      }
    }

    this.controller.applyCart();
  }

  fill(product: Product) {
    this.fillBreadcrumbsNav(product);
    this.fillProduct(product);
    this.productRoot.append(this.breadcrumbsNav, this.productWrapper);
    this.root.append(this.productRoot);

    this.addHandlers();
  }

  fillBreadcrumbsNav({ category, title }: Product) {
    this.breadcrumbsNav.innerHTML = `
      <ul class="breadcrumbs-nav__list">
        <li class="breadcrumbs-nav__item"><a class="bread__link" href="/">Главная</a></li>
        <li class="breadcrumbs-nav__item"><a class="bread__link" href="/?${SearchParams.CATEGORY}=${category.id}">${category.name}</a></li>
        <li class="breadcrumbs-nav__item"><a href="#" onClick="return(false);">${title}</a></li>
      </ul>`;
  }

  fillProduct(product: Product) {
    let template = `<div class="product__pictures pictures">`;

    if (product.images.length) {
      template += this.addImages(product.images);
    }

    template += `</div>`;

    if (product) {
      template += this.addProduct(product);
    }

    this.productWrapper.innerHTML = template;
  }

  addImages(images: string[]) {
    let template = `<div class="pictures__main-pic">
                            <img src="${images[0]}" alt="Product image">                                
                        </div>`;

    template += `<ul class="pictures__list">`;

    images.forEach((image: string) => {
      template += `<li class="pictures__item">
                            <img src="${image}" alt="Product image">
                         </li>`;
    });

    template += `</ul>`;

    return template;
  }

  addProduct(product: Product) {
    headStyle.clearHeadStyle();
    const headStyleInner = headStyle.getHeadStyle();

    headStyleInner.innerHTML += `
      #rating-${product.id}:before {
        content: '★★★★★';
        letter-spacing: 3px;
        background: linear-gradient(90deg, #fc0 ${
          (product.rating / 5) * 100
        }%, #fff ${(product.rating / 5) * 100}%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;}\n`;

    return `
      <div class="product__content">
        <h2 class="product__title title">${product.title}</h2>
        <div class="product__desc">
            <h4 class="product__desc-title title">Описание товара</h4>
            <span>${product.description}</span>                  
        </div>

        <div class="product__info">
            <h4 class="product__info-title title">Характеристики</h4>
            <ul class="product__info-list info-list">
                <li class="info-list__item">
                    <span class="info-list__name">Категория</span>
                    <span class="info-list__value">${
                      product.category.name
                    }</span>
                </li>
                <li class="info-list__item">
                    <span class="info-list__name">Производитель</span>
                    <span class="info-list__value">${product.brand.name}</span>
                </li>
                <li class="info-list__item">
                    <span class="info-list__name">В наличии</span>
                    <span class="info-list__value">${product.stock}</span>
                </li>
            </ul>
        </div>

        <div class="product__price">
            <span class="product__price-default">${product.price}₽</span>
            <span class="product__price-discount">${(
              product.price -
              (product.price / 100) * product.discountPercentage
            ).toFixed(2)}₽</span>
        </div>

        <div class="product__rating">
            <span class="product__rating-stars" id="rating-${product.id}">${
      product.rating
    }</span>
        </div>

        <div class="product__buttons">
            <button class="button button--rounded button--bordered">Add to cart</button>
            <button class="button button--rounded button--bordered">Buy now</button>
        </div>
      </div>`;
  }

  addHandlers() {
    Utils.addEvent(".pictures__list", "click", (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.tagName !== "IMG") {
        return;
      }

      const rootPicture = Utils.id(".pictures__main-pic") as ExtendedElement;
      rootPicture.innerHTML = "";
      rootPicture.append(target.cloneNode(true));
    });

    for (const link of Utils.id(
      ".bread__link"
    ) as NodeListOf<ExtendedElement>) {
      link.addEventListener("click", (e: Event) => {
        this.controller.route(link.href!, e);
      });
    }
  }
}
