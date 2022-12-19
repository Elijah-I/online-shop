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

  get filterCategories() {
    return this.filterModel.getCategories(this.route.searchParams.category);
  }

  private initState() {
    const products: Product[] = [...Products];
    const brands: Record<string, Brand> = {};
    const categories: Record<string, Category> = {};

    const checkedCategoriesId = JSON.parse(
      localStorage.getItem("checkedCategoriesId") || "[]"
    );

    const checkedBrandsId = JSON.parse(
      localStorage.getItem("checkedBrandsId") || "[]"
    );

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

    State.products.map((product) => {
      product.show = true;

      if (
        selectedCategories.length &&
        selectedCategories.includes(product.category.id.toString()) === false
      ) {
        product.show = false;
      }

      return product;
    });

    this.emmit("filter.update");
  }
}
