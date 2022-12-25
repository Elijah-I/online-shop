export type Category = {
  id: number;
  name: string;
  checked: boolean;
};

export type Brand = Category;

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  stockUsed: number;
  brand: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  thumbnail: string;
  images: string[];
  show: boolean;
  cart: boolean;
};

export type Price = {
  from: number;
  max: number;
  to: number;
};

export type Stock = Price;

export type CategoriesAmount = Record<string, number>;
export type CartStocks = Record<number, number>;
export type BrandsAmount = CategoriesAmount;

interface IState {
  route: string;
  deployPath: string;
  categories: Category[];
  brands: Brand[];
  products: Product[];
  price: Price;
  stock: Stock;
  layout: string;
  sort: string;
  search: string;
  cart: number[];
  cartStock: CartStocks;
  pagination: Pagination;
  amount: {
    categories: CategoriesAmount;
    brands: BrandsAmount;
    total: number;
  };
}

export type Pagination = {
  perPage: number;
  currentPage: number;
};

export const State: IState = {
  route: window.location.href,
  deployPath: "/online-shop-release",

  pagination: {
    perPage: 5,
    currentPage: 1
  },

  products: [],

  categories: [],

  brands: [],

  cart: [],
  cartStock: {},

  search: "",

  price: {
    from: 0,
    to: 0,
    max: 0
  },

  stock: {
    from: 0,
    to: 0,
    max: 0
  },

  amount: {
    categories: {},
    brands: {},
    total: 0
  },

  layout: "",
  sort: ""
};
