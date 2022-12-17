interface IState {
  route: string;
  deployPath: string;
}

export const State: IState = {
  route: window.location.href,
  deployPath: "/online-shop-release"
};
