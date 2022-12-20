import {State} from "../store";

export class ControlsModel {
    changeLayout(layout: string) {
        State.layout = layout;
    }

    getLayout(searchLayout: string | null) {
        return searchLayout ? searchLayout : 'columns';
    }

    changeSort(sort: string) {
        State.sort = sort;
    }

    getSort(searchSort: string | null) {
        return searchSort ? searchSort : 'default';
    }
}
