interface IState {
  route: string;
}

export const State: IState = {
  route: window.location.href
};
