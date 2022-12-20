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
  show?: boolean;
};

export type Price = {
  from: number;
  max: number;
  to: number;
};

export type Stock = Price;

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
}

export const State: IState = {
  route: window.location.href,
  deployPath: "/online-shop-release",

  products: [],

  categories: [],

  brands: [],

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

  layout: "",
  sort: ""
};
