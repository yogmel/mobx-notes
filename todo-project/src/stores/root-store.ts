import DataStore from "./data/data-store";
import UiStore from "./ui/ui-store";

export default class RootStore {
    dataStore = new DataStore(this);
    uiStore = new UiStore(this);
}