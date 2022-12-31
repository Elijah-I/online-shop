import { Model } from "../../../src/model/index";
import { Controller } from "../../../src/controller/index";
import { OrderModalView } from "../../../src/view/cartView/orderModal.view";
import { Utils } from "../../../src/utils/utils";

const model = new Model();
const controller = new Controller(model);
const orderModalView = new OrderModalView(controller, model);

describe("addTitle", () => {
  it("should return h3 element", () => {
    expect(orderModalView.addTitle()).toEqual(`<h3 class="order__title title">Данные для доставки</h3>`);
  });
});

describe("addErrorMessage", () => {
  const wrapper = Utils.create('wrapper', 'div');
  const prevEl = Utils.create('prev', 'div');
  const target = Utils.create('target', 'div') as HTMLInputElement;

  wrapper.append(prevEl, target);

  it("should append span with error message", () => {
    orderModalView.addErrorMessage(target, '');
    expect(wrapper.innerHTML).toContain(`<span class="error" style="color: red; padding-left: 5px; font-size: 1.2rem;">`);
  });

  it("should remove span with error message", () => {
    orderModalView.removeErrorMessage(target);
    expect(wrapper.innerHTML).toContain(`<div class="prev"></div><div class="target" style="border-color: red;"></div>`);
  });

  it("should add styles for correct message", () => {
    orderModalView.addCorrectMessage(target);
    expect(wrapper.innerHTML).toContain(`<div class="prev"></div><div class="target" style="border-color: green;"></div>`);
  });
});
