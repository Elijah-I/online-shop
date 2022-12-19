import { Brand, Category, State } from "store/index";
import Products from "../store/products.json";
import { Observer } from "../utils/observer";
import { RouterModel } from "./router.model";

export class Model extends Observer {
  routerModel: RouterModel;

  constructor() {
    super();

    this.routerModel = new RouterModel();
    this.initState();
  }

  setRoute(route: string) {
    this.routerModel.setRoute(route);
    this.emmit("route");
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

  private initState() {
    const brands: Record<string, Brand> = {};
    const categories: Record<string, Category> = {};

    const checkedCategoriesId = JSON.parse(
      localStorage.getItem("checkedCategoriesId") || "[]"
    );

    const checkedBrandsId = JSON.parse(
      localStorage.getItem("checkedBrandsId") || "[]"
    );

    Products.forEach((product) => {
      categories[product.category.id] = {
        ...product.category,
        checked: checkedCategoriesId.includes(product.category.id)
      };

      brands[product.brand.id] = {
        ...product.brand,
        checked: checkedBrandsId.includes(product.brand.id)
      };
    });

    State.categories = [...Object.values(categories)];
    State.brands = [...Object.values(brands)];

    console.log(State);
  }
}
