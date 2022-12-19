import { Brand, Category, Product, State } from "store/index";
import Products from "../store/products.json";
import { Observer } from "../utils/observer";
import { FilterModel } from "./filter.model";
import { RouterModel } from "./router.model";

export class Model extends Observer {
  routerModel: RouterModel;
  filterModel: FilterModel;

  constructor() {
    super();

    this.routerModel = new RouterModel();
    this.filterModel = new FilterModel();

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

  changeFilterCategory(checked: boolean, id: number) {
    this.filterModel.changeCategory(checked, id);
  }

  changeFilterBrand(checked: boolean, id: number) {
    this.filterModel.changeBrand(checked, id);
  }

  get filterCategories() {
    return this.filterModel.getCategories(this.route.searchParams.category);
  }

  get filterBrands() {
    return this.filterModel.getBrands(this.route.searchParams.brand); // получаем массив значений по ключу из адресной строки после &brand=...
  }

  private initState() {
    const products: Product[] = [...Products];
    const brands: Record<string, Brand> = {};
    const categories: Record<string, Category> = {};

    const checkedCategoriesId = this.filterCategories;
    const checkedBrandsId = this.filterBrands;

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
    });

    State.categories = [...Object.values(categories)];
    State.brands = [...Object.values(brands)];
    State.products = [...products];
  }

  applySearchFilters() {
    const selectedCategories = this.filterCategories;
    const selectedBrands = this.filterBrands;

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

      return product;
    });

    this.emmit("filter.update");
  }
}
