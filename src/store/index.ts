interface IState {
  route: string;
  deployPath: string;
  categories: JSONObject[];
  brands: JSONObject[];
}

interface JSONObject {
  [key: string]: string | number | boolean;
}

export const State: IState = {
  route: window.location.href,
  deployPath: "/online-shop-release",
  categories: [
    {
      id: 0,
      checked: true
    },
    {
      id: 1,
      checked: true
    },
    {
      id: 2,
      checked: false
    },
    {
      id: 3,
      checked: false
    },
    {
      id: 4,
      checked: true
    },
    {
      id: 5,
      checked: false
    },
    {
      id: 6,
      checked: true
    }
  ],
  brands: [
    {
      id: 0,
      checked: true
    },
    {
      id: 1,
      checked: true
    },
    {
      id: 2,
      checked: false
    },
    {
      id: 3,
      checked: false
    },
    {
      id: 4,
      checked: true
    },
    {
      id: 5,
      checked: false
    },
    {
      id: 6,
      checked: true
    }
  ]
};
