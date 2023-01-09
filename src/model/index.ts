import {
  Brand,
  BrandsAmount,
  CategoriesAmount,
  Category,
  Product,
  State
} from "store/index";

const Products = require("../store/products.json");

import { Observer } from "../utils/observer";
import { FilterModel } from "./filter.model";
import { RouterModel } from "./router.model";
import { ControlsModel } from "./controls.model";
import { SortSettings } from "types/sortSettings";
import { SearchModel } from "./search.model";
import { CartModel } from "./cart.model";
import { SearchParams } from "types/searchParams";

export class Model extends Observer {
  routerModel: RouterModel;
  filterModel: FilterModel;
  controlsModel: ControlsModel;
  searchModel: SearchModel;
  cartModel: CartModel;

  constructor() {
    super();

    this.routerModel = new RouterModel();
    this.filterModel = new FilterModel();
    this.controlsModel = new ControlsModel();
    this.searchModel = new SearchModel();
    this.cartModel = new CartModel();

    this.initState();
  }

  setRoute(route: string, noEmmit = false) {
    this.routerModel.setRoute(route);
    if (!noEmmit) this.emmit("route");
  }

  get route() {
    return this.routerModel.route;
  }

  get brands() {
    return State.brands;
  }

  get categories() {
    return State.categories;
  }

  get products() {
    return State.products;
  }

  get layout() {
    return State.layout;
  }

  get sort() {
    return State.sort;
  }

  get stockRange() {
    return State.stock;
  }

  get priceRange() {
    return State.price;
  }

  get amount() {
    return State.amount;
  }

  changeFilterCategory(checked: boolean, id: number) {
    this.filterModel.changeCategory(checked, id);
  }

  changeFilterBrand(checked: boolean, id: number) {
    this.filterModel.changeBrand(checked, id);
  }

  changeFilterPrice(from: number, to: number) {
    this.filterModel.changePrice(from, to);
  }

  changeFilterStock(from: number, to: number) {
    this.filterModel.changeStock(from, to);
  }

  changeLayout(layout: string) {
    this.controlsModel.changeLayout(layout);
  }

  changeSort(sort: string) {
    this.controlsModel.changeSort(sort);
  }

  get perPage() {
    return this.cartModel.getPerPage(this.route.searchParams.per);
  }

  get currentPage() {
    return this.cartModel.getCurrentPage(this.route.searchParams.page);
  }

  get filterCategories() {
    return this.filterModel.getCategories(this.route.searchParams.category);
  }

  get filterBrands() {
    return this.filterModel.getBrands(this.route.searchParams.brand);
  }

  get filterPrice() {
    return this.filterModel.getPrices(this.route.searchParams.price);
  }

  get filterStock() {
    return this.filterModel.getStocks(this.route.searchParams.stock);
  }

  get controlLayout() {
    return this.controlsModel.getLayout(this.route.searchParams.layout);
  }

  get controlSort() {
    return this.controlsModel.getSort(this.route.searchParams.sort);
  }

  get searchPattern() {
    return this.searchModel.getPattern(this.route.searchParams.search);
  }

  get search() {
    return State.search;
  }

  get cartItems() {
    return State.products.filter((product) => product.cart);
  }

  get cartIds() {
    return State.cart;
  }

  get cartStocks() {
    return State.cartStock;
  }

  get pagination() {
    return State.pagination;
  }

  get promo() {
    return State.promo;
  }

  get cartStockTotal() {
    return Object.values(State.cartStock).reduce(
      (acc, stockValue) => acc + stockValue,
      0
    );
  }

  get totalPrice() {
    return this.cartItems.reduce((sum, product) => {
      sum += product.price * product.stockUsed;
      return sum;
    }, 0);
  }

  get totalDiscounted() {
    return this.cartItems.reduce((sum, product) => {
      sum +=
        (product.price - (product.price / 100) * product.discountPercentage) *
        product.stockUsed;

      return +sum.toFixed(2);
    }, 0);
  }

  inCart(id: number) {
    return State.cart.includes(id);
  }

  totalStock(id: number) {
    return State.products[id].stock - State.products[id].stockUsed;
  }

  initState() {
    const products: Product[] = [...Products];
    const brands: Record<string, Brand> = {};
    const categories: Record<string, Category> = {};
    const stock = { ...State.stock };
    const price = { ...State.price };
    const searchPattern = this.searchPattern;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartStock = JSON.parse(localStorage.getItem("cartStock") || "[]");

    const promo = JSON.parse(localStorage.getItem("promo") || "[]");

    const perPage = this.perPage;
    const currentPage = this.currentPage;

    const checkedCategoriesId = this.filterCategories;
    const checkedBrandsId = this.filterBrands;
    const [filterStockFrom, filterStockTo] = this.filterStock;
    const [filterPriceFrom, filterPriceTo] = this.filterPrice;

    const layout = this.controlLayout;
    const sort = this.controlSort;

    products.forEach((product) => {
      const withBrand = checkedBrandsId.includes(product.brand.id.toString());
      const withCategory = checkedCategoriesId.includes(
        product.category.id.toString()
      );

      categories[product.category.id] = {
        ...product.category,
        checked: withCategory
      };

      brands[product.brand.id] = {
        ...product.brand,
        checked: withBrand
      };

      if (product.stock > stock.max) {
        stock.max = product.stock;
      }

      if (product.price > price.max) {
        price.max = product.price;
      }

      product.cart = cart.includes(product.id);
      product.stockUsed = cartStock[product.id] ? +cartStock[product.id] : 0;
    });

    State.products = [...products];

    State.categories = [...Object.values(categories)];

    State.brands = [...Object.values(brands)];

    State.stock = {
      from: filterStockFrom ? +filterStockFrom : this.getRangeFrom(stock),
      to: filterStockTo ? +filterStockTo : this.getRangeTo(stock),
      max: stock.max
    };

    State.price = {
      from: filterPriceFrom ? +filterPriceFrom : this.getRangeFrom(price),
      to: filterPriceTo ? +filterPriceTo : this.getRangeTo(price),
      max: price.max
    };

    State.layout = layout;
    State.sort = sort;
    State.search = searchPattern;

    State.cart = [...cart];
    State.cartStock = { ...cartStock };

    State.promo = [...promo];

    State.pagination = {
      perPage,
      currentPage
    };
  }

  private getRangeFrom(range: { max: number }) {
    return Math.round(range.max - range.max * 0.9);
  }

  private getRangeTo(range: { max: number }) {
    return Math.round(range.max - range.max * 0.1);
  }

  applyFilters() {
    const find = this.searchPattern;
    const selectedBrands = this.filterBrands;
    const selectedCategories = this.filterCategories;
    const [selectedStockFrom, selectedStockTo] = this.filterStock;
    const [selectedPriceFrom, selectedPriceTo] = this.filterPrice;

    State.products.map((product) => {
      product.show = true;

      if (
        selectedCategories.length &&
        selectedCategories.includes(product.category.id.toString()) === false
      ) {
        product.show = false;
      }

      if (
        selectedBrands.length &&
        selectedBrands.includes(product.brand.id.toString()) === false
      ) {
        product.show = false;
      }

      if (selectedStockFrom && selectedStockTo) {
        if (
          product.stock < +selectedStockFrom ||
          product.stock > +selectedStockTo
        ) {
          product.show = false;
        }
      }

      if (selectedPriceFrom && selectedPriceTo) {
        if (
          product.price < +selectedPriceFrom ||
          product.price > +selectedPriceTo
        ) {
          product.show = false;
        }
      }

      let show = false;

      if (!find) show = true;

      if (!show) show = this.searchContains(find, product.brand.name);
      if (!show) show = this.searchContains(find, product.category.name);
      if (!show) show = this.searchContains(find, product.title);
      if (!show) show = this.searchContains(find, product.price.toString());
      if (!show) show = this.searchContains(find, product.description);

      if (!show) {
        product.show = false;
      }

      return product;
    });

    this.calculateAmounts();

    this.emmit("filter.update");
  }

  private calculateAmounts() {
    const categories: CategoriesAmount = {};
    const brands: BrandsAmount = {};
    let total = this.cartIds.length;
    const price = { min: 10000000, max: 0 };
    const stock = { min: 10000000, max: 0 };
    const [selectedStockFrom, selectedStockTo] = this.filterStock;
    const [selectedPriceFrom, selectedPriceTo] = this.filterPrice;

    State.products.forEach((product) => {
      if (product.show) {
        const categoryID = product.category.id;
        const brandID = product.brand.id;

        categories[categoryID] = categories[categoryID]
          ? categories[categoryID] + 1
          : 1;

        brands[brandID] = brands[brandID] ? brands[brandID] + 1 : 1;

        if (price.min > product.price) {
          price.min = product.price;
        }

        if (price.max < product.price) {
          price.max = product.price;
        }

        if (stock.min > product.stock) {
          stock.min = product.stock;
        }

        if (stock.max < product.stock) {
          stock.max = product.stock;
        }
      }
    });

    let calcStock = false;
    let calcPrice = false;

    for (const param in this.route.searchParams) {
      if (this.route.searchParams[param]) {
        if (param !== SearchParams.STOCK && param !== SearchParams.PRICE) {
          if (stock.min < 1000000) calcStock = true;
          if (price.min < 1000000) calcPrice = true;
        }
      }
    }

    State.stock = {
      from: selectedStockFrom
        ? +selectedStockFrom
        : calcStock
        ? stock.min
        : this.getRangeFrom(State.stock),
      to: selectedStockTo
        ? +selectedStockTo
        : calcStock
        ? stock.max
        : this.getRangeTo(State.stock),
      max: State.stock.max
    };

    State.price = {
      from: selectedPriceFrom
        ? +selectedPriceFrom
        : calcPrice
        ? price.min
        : this.getRangeFrom(State.price),
      to: selectedPriceTo
        ? +selectedPriceTo
        : calcPrice
        ? price.max
        : this.getRangeTo(State.price),
      max: State.price.max
    };

    total = Object.values(categories).reduce(
      (acc, category) => (acc += category),
      0
    );

    State.amount = {
      categories,
      brands,
      total
    };
  }

  applyControls() {
    const sort = this.controlSort;

    switch (sort) {
      case SortSettings.DEFAULT:
        State.products.sort(
          (productFirst, productSecond) => productFirst.id - productSecond.id
        );
        break;
      case SortSettings.PRICE_LOW_TO_HIGH:
        State.products.sort(
          (productFirst, productSecond) =>
            productFirst.price - productSecond.price
        );
        break;

      case SortSettings.PRICE_HIGH_TO_LOW:
        State.products.sort(
          (productFirst, productSecond) =>
            productSecond.price - productFirst.price
        );
        break;

      case SortSettings.RATING_HIGH_TO_LOW:
        State.products.sort(
          (productFirst, productSecond) =>
            productSecond.rating - productFirst.rating
        );
        break;

      case SortSettings.RATING_LOW_TO_HIGH:
        State.products.sort(
          (productFirst, productSecond) =>
            productFirst.rating - productSecond.rating
        );
        break;
    }

    this.emmit("controls.update");
  }

  applyCart() {
    const cartIds = this.cartIds;
    const cartStocks = this.cartStocks;

    State.products.map((product) => {
      if (cartIds.includes(product.id)) {
        product.cart = true;
      }

      product.stockUsed = cartStocks[product.id] ? cartStocks[product.id] : 0;

      return product;
    });

    this.emmit("cart.update");
  }

  resetCart() {
    this.cartModel.resetCart();
    this.emmit("cart.update");
    this.emmit("cart.reset");
  }

  changeQantity(id: number, qantity: number) {
    const added = this.cartModel.changeQantity(id, qantity, () =>
      this.emmit("cart.null")
    );
    if (added) this.emmit("cart.update");
  }

  switchPage(direction: number) {
    const switched = this.cartModel.switchPage(
      this.cartItems.length,
      direction,
      State.pagination
    );
    if (switched) this.emmit("cart.update");

    return switched;
  }

  applyPerPage(perPage: number) {
    const applied = this.cartModel.applyPerPage(perPage);
    if (applied) this.emmit("cart.update");

    return applied;
  }

  applyPromo(promo: string) {
    const applied = this.cartModel.applyPromo(this.promo, promo);
    if (applied) this.emmit("cart.update");
  }

  verifyPromo(promo: string) {
    return this.cartModel.verifyPromo(this.promo, promo);
  }

  removePromo(promo: string) {
    const removed = this.cartModel.removePromo(this.promo, promo);
    if (removed) this.emmit("cart.update");
  }

  changeSearchPattern(searchPattern: string) {
    this.searchModel.changePattern(searchPattern);
  }

  private searchContains(searchPattern: string, searchString: string) {
    let contains = false;

    const searchPatterns = searchPattern.split(" ");
    for (const find of searchPatterns) {
      if (searchString.toLocaleLowerCase().includes(find.toLocaleLowerCase())) {
        contains = true;
      }
    }

    return contains;
  }

  toggleCart(id: number) {
    this.cartModel.toggle(id);
  }

  makeOrder() {
    localStorage.setItem("with.popup", "1");
    this.emmit("order.create");
  }
}
