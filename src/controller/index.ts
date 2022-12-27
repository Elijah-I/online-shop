import { SearchParams } from "types/searchParams";
import { Model } from "../model/index";
import { CartController } from "./cart.controller";
import { FilterController } from "./filter.controller";
import { RouterController } from "./router.controller";
import { SearchController } from "./search.controller";

export class Controller {
  searchDelay: null | ReturnType<typeof setTimeout>;
  routerController: RouterController;
  filterController: FilterController;
  searchController: SearchController;
  cartController: CartController;

  constructor(private model: Model) {
    this.searchDelay = null;

    this.routerController = new RouterController(model);
    this.cartController = new CartController(model, this.routerController);
    this.searchController = new SearchController(model, this.routerController);
    this.filterController = new FilterController(model, this.routerController);
  }

  route(route: string, event: Event | false = false) {
    this.routerController.route(route, event);
  }

  updateRoute(route: string) {
    this.routerController.updateRoute(route);
  }

  addSearchPattern(searchPattern: string) {
    if (this.searchDelay) {
      clearTimeout(this.searchDelay);
    }

    this.searchDelay = setTimeout(() => {
      this.searchController.addPattern(searchPattern);
    }, 1000);
  }

  changeFilterCategory(checked: boolean, id: number) {
    this.filterController.changeCategory(checked, id);
  }

  changeFilterBrand(checked: boolean, id: number) {
    this.filterController.changeBrand(checked, id);
  }

  applyFilters() {
    this.model.applyFilters();
  }

  applyControls() {
    this.model.applyControls();
  }

  applyCart() {
    this.model.applyCart();
  }

  changeFilterPrice(from: number, to: number) {
    this.filterController.changePrice(from, to);
  }

  changeFilterStock(from: number, to: number) {
    this.filterController.changeStock(from, to);
  }

  resetFilter() {
    this.filterController.reset();
  }

  changeLayout(layout: string) {
    this.model.changeLayout(layout);

    this.routerController.addSearchParam([[SearchParams.LAYOUT, layout]]);
  }

  changeSort(sort: string) {
    this.model.changeSort(sort);

    this.routerController.addSearchParam([[SearchParams.SORT, sort]]);

    this.applyControls();
  }

  toggleCart(id: number) {
    this.cartController.toggle(id);
  }

  quickBuy(e: Event, id: number, href: string) {
    this.cartController.quickBuy(e, id, href);
  }

  resetCart() {
    this.cartController.resetCart();
  }

  changeQantity(id: number, qantity: number) {
    this.cartController.changeQantity(id, qantity);
  }

  switchPage(direction: number) {
    this.cartController.switchPage(direction);
  }

  applyPerPage(perPage: number) {
    this.cartController.applyPerPage(perPage);
  }

  applyPromo(promo: string) {
    this.cartController.applyPromo(promo);
  }

  removePromo(promo: string) {
    this.cartController.removePromo(promo);
  }
}
