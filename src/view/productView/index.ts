import { ExtendedElement, Utils } from "../../utils/utils";
import { Controller } from "../../controller";
import { Model } from "../../model";
import { Product } from "../../store";
import { headStyle } from "../../utils/headStyle";
import { SearchParams } from "types/searchParams";
import { ModalWindow } from "../../utils/modal";

export class ProductView {
  productId: number;
  productRoot: HTMLElement;
  breadcrumbsNav: HTMLElement;
  productWrapper: HTMLElement;
  modal: ModalWindow;

  constructor(
    private controller: Controller,
    private model: Model,
    private root: ExtendedElement,
    private onCartUpdate: (a: number, s: number, d: number) => void
  ) {
    this.productRoot = Utils.create<HTMLElement>("product", "section");
    this.breadcrumbsNav = Utils.create<HTMLElement>("breadcrumbs-nav", "div");
    this.productWrapper = Utils.create<HTMLElement>("product__wrapper", "div");
    this.modal = new ModalWindow();

    this.productId = -1;
  }

  render(id: string) {
    this.root.html("");

    for (let i = 0; i < this.model.products.length; i++) {
      if (this.model.products[i].id === parseInt(id)) {
        this.productId = +id;
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
    this.addListeners();
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
                      <span class="icon icon--zoom" data-id="zoom"></span>
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

    const inCart = this.model.inCart(product.id);

    const buttonText = inCart ? "Remove from cart" : "Add to cart";
    const buttonClass = `button button--rounded button--bordered button__add-product${
      inCart ? " button--carted" : ""
    }`;

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
                    <span class="info-list__value-product">${
                      product.stock - product.stockUsed
                    }</span>
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
            <button class="${buttonClass}" data-id="${
      product.id
    }">${buttonText}</button>
            <a href="/cart" class="button button--rounded button--bordered button__buy-product" data-id="${
              product.id
            }">Buy now</a>
        </div>
      </div>`;
  }

  addHandlers() {
    Utils.addEvent(".pictures__list", "click", (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.tagName === "IMG") {
        const rootPicture = Utils.id(".pictures__main-pic") as ExtendedElement;
        rootPicture.innerHTML = "";
        rootPicture.append(target.cloneNode(true));
      }

      if (target.tagName === "SPAN") {
        const currentImg = target.previousElementSibling as HTMLElement;
        this.appendImgZoomModal(currentImg);
      }
    });

    for (const link of Utils.id(
      ".bread__link"
    ) as NodeListOf<ExtendedElement>) {
      link.addEventListener("click", (e: Event) => {
        this.controller.route(link.href!, e);
      });
    }

    const buttonAdd = Utils.id(".button__add-product");
    const buttonBuy = Utils.id(".button__buy-product");

    if (buttonAdd !== null)
      Utils.addEvent(buttonAdd as ExtendedElement, "click", () => {
        this.controller.toggleCart(+(buttonAdd as ExtendedElement).dataset!.id);
        return false;
      });

    if (buttonBuy !== null)
      (buttonBuy as ExtendedElement).addEventListener("click", (e: Event) => {
        this.controller.quickBuy(
          e,
          +(buttonBuy as ExtendedElement).dataset!.id,
          (buttonBuy as ExtendedElement).href!
        );
        return false;
      });
  }

  private addListeners() {
    const cartCallback = () => {
      const cartIds = this.model.cartIds;

      this.applyCart(cartIds);

      this.onCartUpdate(
        this.model.cartStockTotal,
        this.model.totalPrice,
        this.model.totalDiscounted
      );
    };

    this.model.on("cart.update", cartCallback);

    window.addEventListener("storage", () => {
      this.model.initState();
      this.controller.applyCart();
      cartCallback();
    });
  }

  private applyCart(cartIds: number[]) {
    const added = cartIds.includes(this.productId);
    const buttonAdd = Utils.id(".button__add-product");
    const listValue = Utils.id(".info-list__value-product");

    if (buttonAdd !== null)
      (buttonAdd as ExtendedElement)
        .class("button--carted", !added)
        .html(added ? "Remove from cart" : "Add to cart");

    if (listValue !== null)
      (listValue as ExtendedElement).html(
        this.model.totalStock(this.productId).toString()
      );
  }

  appendImgZoomModal(currentImg: HTMLElement) {
    const modalImgWrapper = Utils.create("modal__img", "div");
    modalImgWrapper.id = "modal__img";

    const modalImg = currentImg.cloneNode(true) as HTMLImageElement;
    modalImg.className = "modal__img-origin";
    modalImg.id = "origin-img";

    const modalZoomImg = Utils.create("modal__img-zoom", "span") as HTMLImageElement;
    modalZoomImg.id = "zoom-img";
    modalZoomImg.style.backgroundImage = `url('${modalImg.src}')`;
    modalZoomImg.style.backgroundRepeat = "no-repeat";

    const modalTitle = Utils.create("modal__img-text", "p");
    modalTitle.innerText = "Для того, чтобы приблизить изображение, наведите на него"

    modalImgWrapper.append(modalTitle, modalImg, modalZoomImg);
    this.modal.buildModal(modalImgWrapper);

    modalImg.addEventListener('mousemove', (e: MouseEvent) => this.handleZoomImage(e, modalImg, modalZoomImg))
  }

  handleZoomImage(e: MouseEvent, modalImg: HTMLElement, modalZoomImg: HTMLElement) {
    const {left, top} = modalImg.getBoundingClientRect();
    const posX = e.pageX - left - window.pageXOffset;
    const posY = e.pageY - top - window.pageYOffset;

    modalZoomImg.style.left = `${posX - modalZoomImg.offsetWidth / 2}px`;
    modalZoomImg.style.top = `${posY - modalZoomImg.offsetHeight / 2}px`;

    const posXZoom = posX * 2 - (modalZoomImg.offsetWidth / 2);
    const posYZoom = posY * 2 - (modalZoomImg.offsetHeight / 2);

    modalZoomImg.style.backgroundPosition = `-${posXZoom}px -${posYZoom}px`;
  }
}
