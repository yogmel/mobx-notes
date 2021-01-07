import { action, autorun, makeAutoObservable, observable, reaction, runInAction, when } from "mobx";

class Person {
  @observable // using a decorator to make the firstName variable an observable
  firstName: string;
  @observable
  age: number;

  constructor(name: string, age: number) {
    this.firstName = name;
    this.age = age;
    makeAutoObservable(this);
    when(
      () => this.age > 99, // condition
      () => this.bury() // effect
    )
  }

  @action
  updateFirstName(name: string) {
    this.firstName = name;
  }
  @action
  bury() {
    console.log(`${this.firstName} is dead`);
  }
}

const newPerson = new Person("Aloka", 25);

// reacting
autorun(() => {
  console.log(`Person name is: ${newPerson.firstName}`)
});

reaction(
  () => newPerson.age > 99, // condition
  () => newPerson.bury() // effect
);

// updating
newPerson.updateFirstName("Mobx");

runInAction(() => {
    newPerson.firstName = "Alokaa";
    newPerson.age = 100;
})

const updater = action(() => {
    newPerson.firstName = "Alokaa in updater";
})

updater();

export {};
