import RootStore from "../root-store";

let runningId = 0;

export default class UiStore {
    constructor(public rootStore: RootStore) {}
}