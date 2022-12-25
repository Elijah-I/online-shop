import { Controller } from "../../controller";
import { Model } from "../../model";
import { ExtendedElement, Utils } from "../../utils/utils";

export class CartListView {
  constructor(private controller: Controller, private model: Model) {}

  render(root: HTMLElement) {
    root.innerHTML = "";

    const cartList = Utils.create<HTMLElement>(
      "cart-section__shopping shopping",
      "div"
    );

    this.fill(cartList);

    root.append(cartList);

    this.addHandlers();
    this.addLocalHandlers();
  }

  fill(root: HTMLElement) {
    root.append(this.addTitle());

    this.fillTable(root);
  }

  addTitle() {
    const title = Utils.create<HTMLElement>("shopping__title title", "h2");
    title.innerText = "Моя корзина";

    return title;
  }

  fillTable(root: HTMLElement) {
    root.innerHTML = "";

    const cartTable = Utils.create<HTMLElement>(
      "shopping__table shopping-table",
      "table"
    );

    let template = ``;

    template += this.addTableHead();
    template += this.addTableBody();
    template += this.addTableFooter();

    cartTable.innerHTML = template;

    root.append(cartTable);
  }

  addTableHead() {
    return `<thead class="shopping-table__head">
                                    <tr class="shopping-table__head-row">
                                        <th>№</th>
                                        <th>Товар</th>
                                        <th>Категория</th>
                                        <th>Бренд</th>
                                        <th>Цена</th>
                                        <th>В наличии</th>
                                        <th>Количество</th>
                                        <th>Сумма</th>
                                    </tr>
                                </thead>`;
  }

  addTableBody() {
    const { perPage, currentPage } = this.model.pagination;

    let template = `<tbody class="shopping-table__body">`;

    let serialNumber = 1;
    this.model.cartItems.forEach((product, order) => {
      const page = Math.ceil((order + 1) / perPage);

      if (page === currentPage)
        template += `
        <tr class="shopping-table__body-row table-item" id="cart-product-${
          product.id
        }">
          <td>
              <span class="table-item__number">${serialNumber}</span>
          </td>
          <td>
              <div class="table-item__product">
                  <div class="table-item__img">
                      <img src="${product.thumbnail}" alt="Product photo">
                  </div>
                  <span class="table-item__title">${product.title}</span>
              </div>
          </td>
          <td>
              <span class="table-item__category">${product.category.name}</span>
          </td>
          <td>
              <span class="table-item__brand">${product.brand.name}</span>
          </td>
          <td>
              <span class="table-item__price table-item__price--default">${
                product.price
              } ₽</span>
          </td>
          <td>
              <span class="table-item__stock">${
                product.stock - product.stockUsed
              } шт.</span>
          </td>
          <td>
              <div class="table-item__quantity">
                  <button class="button button--quantity button--quantity-minus" data-id="${
                    product.id
                  }">-</button>
                  <span class="table-item__input" id="input">${
                    product.stockUsed
                  }</span>
                  <button class="button button--quantity button--quantity-plus" data-id="${
                    product.id
                  }">+</button>
              </div>
          </td>

          <td>
              <span class="table-item__amount" id="amount">${
                product.price * product.stockUsed
              } ₽</span>
          </td>
      </tr>`;
      serialNumber++;
    });

    template += `</tbody>`;

    return template;
  }

  addTableFooter() {
    const { perPage, currentPage } = this.model.pagination;

    return `
      <tfoot class="shopping-table__footer">
          <tr class="shopping-table__footer-row">
              <td colspan="2">
                  <div class="table-item__items-on-page items-on-page">
                      <label class="items-on-page__label" for="items-on-page">Товаров на странице</label>
                      <input class="items-on-page__input" type="text" value="${perPage}" maxlength="4" size="4" id="items-on-page">
                  </div>
              </td>
              <td colspan="2">
                  <div class="table-item__pages">
                      <button class="button button--page" id="page-back">
                          <span class="icon icon--arrow-left"></span>
                      </button>
                      <span class="table-item__page">${currentPage}</span>
                      <button class="button button--page" id="page-forward">
                          <span class="icon icon--arrow-right"></span>
                      </button>
                  </div>
              </td>
              <td colspan="2"></td>
              <td colspan="2" align="right">
                  <div class="table-item__button-reset">
                      <button class="button button--cart-reset" id="cart-reset">Очистить корзину</button>
                  </div>
              </td>
          </tr>
      </tfoot>`;
  }

  addHandlers() {
    Utils.addEvent("#cart-reset", "click", () => {
      this.controller.resetCart();
    });
  }

  addLocalHandlers() {
    const cartMinus = Utils.ids(".button--quantity-minus");
    const cartPlus = Utils.ids(".button--quantity-plus");

    if (cartMinus !== null)
      for (const minus of cartMinus) {
        Utils.addEvent(minus, "click", () => {
          this.controller.changeQantity(+minus.dataset!.id, -1);
        });
      }

    if (cartPlus !== null)
      for (const plus of cartPlus) {
        Utils.addEvent(plus, "click", () => {
          this.controller.changeQantity(+plus.dataset!.id, 1);
        });
      }

    Utils.addEvent("#page-back", "click", () => {
      this.controller.switchPage(-1);
    });

    Utils.addEvent("#page-forward", "click", () => {
      this.controller.switchPage(1);
    });

    const perPage = Utils.id(".items-on-page__input") as ExtendedElement;

    Utils.addEvent(perPage, "blur", () => {
      this.controller.applyPerPage(+perPage.value!);
    });
  }
}
