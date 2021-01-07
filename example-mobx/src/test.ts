import { action, autorun, makeAutoObservable, reaction, runInAction, when } from "mobx";

class Person {
  firstName: string;
  age: number;
  dollars: number;

  constructor(name: string, age: number, dollars: number) {
    this.firstName = name;
    this.age = age;
    this.dollars = dollars;

    makeAutoObservable(this);
    when(
      () => this.age > 99, // condition
      () => this.bury() // effect
    )
  }

  get euros() {
    return this.dollars * 2;
  }

  updateFirstName(name: string) {
    this.firstName = name;
  }
  bury() {
    console.log(`${this.firstName} is dead`);
  }
}

const newPerson = new Person("Aloka", 25, 10);

// reacting
autorun(() => {
  console.log(`Person name is: ${newPerson.firstName}, age ${newPerson.age} with $${newPerson.dollars}`)
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
    newPerson.dollars = 100;
})

const updater = action(() => {
    newPerson.firstName = "Alokaa in updater";
})

updater();

export {};
