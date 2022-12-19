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

interface IState {
  route: string;
  deployPath: string;
  categories: Category[];
  brands: Brand[];
  products: Product[];
}

export const State: IState = {
  route: window.location.href,
  deployPath: "/online-shop-release",
  categories: [],
  brands: [],
  products: []
};
