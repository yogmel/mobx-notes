import { action, autorun, makeAutoObservable, observable, runInAction } from "mobx";

class Person {
  @observable // using a decorator to make the firstName variable an observable
  firstName: string;

  constructor(name: string) {
    this.firstName = name;
    makeAutoObservable(this);
  }

  @action
  updateFirstName(name: string) {
    this.firstName = name;
  }
}

const newPerson = new Person("Aloka");

autorun(() => {
  console.log(`Person name is: ${newPerson.firstName}`)
})

newPerson.updateFirstName("Mobx");

runInAction(() => {
    newPerson.firstName = "Alokaa";
})

const updater = action(() => {
    newPerson.firstName = "Alokaa in updater";
})

updater();

export {};
