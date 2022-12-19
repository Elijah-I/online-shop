export type Category = {
  id: number;
  name: string;
  checked: boolean;
};

export type Brand = Category;

interface IState {
  route: string;
  deployPath: string;
  categories: Category[];
  brands: Brand[];
}

export const State: IState = {
  route: window.location.href,
  deployPath: "/online-shop-release",
  categories: [],
  brands: []
};
