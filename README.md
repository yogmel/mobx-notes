# MobX course

MobX is an Open Source State Management Library, which can be used by any UI framework (React, Angular etc). Its purpose is similar to Redux and RxJS.

- It is minimalistic and boilerplate free. A change is automatically detected and reactivelly propagated to the system.
- All changes are stored in a dependency tree, which garantees that computations are triggered only when necessary.
- It is unopinionated and can be used with any UI framework. 

**Documentation**: https://mobx.js.org/README.html

## Anatomy
- States: observable, which is minimally defined. Should not contain redundant or derivable data. Can be a graph, class, array, ref etc.
- Computed values: values that can be derived from states, using a pure function.
- Actions: events evoke actions, which are the only thing that modify state and may have side effects.
- Reactions: triggers when the state changes. They produce a side effect instead of a value, different from compunted values.

### Observables

They are everything we want to track in our application. It can be defined with `@observable` or with normal function.

- Everything in observable will be made recursively observable as well (except classes, whose observables need to be defined).
- Observable wraps the object with a new one with extra mobx ablities (proxy) and should use toJS or other function to be transformed into a normal function.
- Observables can be objects, maps, arrays and primitive values via `observable.box`.
- `@observable` decorator have a few types: shallow, ref, struct and deep (default, which is the most commonly used).

```typescript
import { observable } from "mobx";

let person = observable({ // this wraps the object into a mobx wrapper
  firstName: 'MobX',
  lastName: 'Course'
});

class Person {
  @observable // using a decorator to make the firstName variable an observable
  firstName: string;

  constructor(name: string) {
    this.firstName = name;
    makeAutoObservable(this);
  }
}
```

### Actions

Are used to update our state. All updates inside an action are batched, but async operations are executed in the next one, as they are not supported in actions.

There are 3 ways to update the state with an action:
- decorator
- action function
- "runInAction" function

```typescript
class Person {
  @observable
  firstName: string;

  constructor(name: string) {
    this.firstName = name;
    makeAutoObservable(this);
  }

  @action // using a decorator to set a method as an action
  updateFirstName(name: string) {
    this.firstName = name;
  }
}

const newPerson = new Person("Aloka");

newPerson.updateFirstName("Mobx"); // using the decorator action

runInAction(() => { // this is declared and executed
  newPerson.firstName = "Mobx";
})

const updater = action(() => { // this action is assigned to a variable which will be called later
  newPerson.firstName = "Mobx";
})

updater();
```

### Reactions

Reactions are the way to know an observable has changed and do something after that. The abstractions below are rarely used, because we will probably use the specific version of mobx, depending on the chosen framework, like `mobx-react`.

There are 3 main types of reactions:
- autorun: tracks every observable accessed inside it, needs to be disposed
- reaction: triggered by a condition you pass to it, needs to be disposed
- when: also triggered by a condition but doesn't need to be disposed - it runs only once after the condition met and then it is automatically disposed
- Observables used after async code won't be tracked

`autorun(effect: (reaction) => void)`
```ts
autorun(() => {
  console.log(`Person name is: ${newPerson.firstName}`); // as firstName is an observable, this will be triggered every time it changes
})
```

`when(predicate: () => boolean, effect?: () => void, options?)`
```ts
class Person {
  @observable
  firstName: string;
  @observable
  age: number;

  constructor(name: string, age: number) {
    this.firstName = name;
    this.age = age;

    when(
      () => this.age > 99, // condition
      () => this.bury() // effect
    )
  }

  @action
  bury() {
    console.log(`${this.firstName} is dead`);
  }
}
```

`reaction(() => value, (value, previousValue, reaction) => { sideEffect }, options?)`
```ts
reaction(
  () => newPerson.age > 99, // condition
  () => newPerson.bury() // effect
);
```

**What does it meant for a reaction to be disposed?**
Reactions watch for changes forever, and if used when not necessary, it can lead to memory leaks. Use the disposed function returned from reaction functions to stop and unsubscribe them.

```ts
const disposer = autorun(() => {
    console.log(counter.count)
})

// stops the autorun
disposer();
```

### Computed values

Computed values are derivations of the state, similar to reactions but instead of producing side effects, they return a value.

They can be used as decorators or functions and are automatically updated just like observables. They are cached if used inside reactions.

They are always getters in classes.

```ts
class Person {
  @observable
  firstName: string;
  @observable
  dollars: number;

  constructor(name: string, dollars: number) {
    this.firstName = name;
    this.dollars = dollars;
  }

  @computed
  get euros() {
    return this.dollars * 2;
  }
}
```

**Updates in MobX**
If used `makeAutoObservable()` or `makeObservable()` in classes, there is no need to use decorators to set observables, actions or computed.

---

## Architecture

### What does MobX reacts to?

> MobX reacts to any existing observable propert that is read during the execution of a tracked function"

- "reading" references an object property, when accessed by, for example: `obj.name` or `obj['name']`.
- "tracked functions" are computed expressions, the `render()` method of and observable component and functions that are passed as params in `reaction()` and `autorun()`.
- "during" means that only those observables that are being read while the function is executing are tracked.


**MobX won't react to**
- Values that are obtained from observables, outside a tracked function. It needs to know when to update, so if the function is outside the `autorun()` function, for example, it won't update. This is for optimization, so only what you need to observe triggers an update.
- Observables that are read in an async invoked code block.

```ts
autorun(async () => {
  console.log(newPerson.firstName); // this will observed
})

autorun(async () => {
  await waitForPromise();
  console.log(newPerson.firstName); // this won't be observed
})

console.log(newPerson.firstName); // this won't be observed
```

### MobX Store

Stores stays between the http service (backend and database) and frontend.

- **Domain store**: manages the application data and logic. Collection of objects.
- **Domain object**: manages specific domain logic, and can be connected to the domain store.
- **UI store**: share global UI information between application or specific pages.

```
/stores
  /data
    data-store.ts
    todo-store.ts
    ui-store.ts
  /ui
    global-view.ts
    ui-store.ts
  root-store.ts
```

`root-store.ts`
```ts
import DataStore from './data/data-store';
import UiStore from './ui/ui-store';

export default class RootStore {
  dataStore: DataStore;
  uiStore: UiStore;

  constructor() {
    this.dataStore = new DataStore(this);
    this.uiStore = new UiStore(this);
  }
}
```

`global-view.ts`
```ts
import { observable } from 'mobx';
import RootStore from './../RootStore';

export default class GlobalView {
  @observable
  themeColor: string = 'blue';

  constructor(rootStore: RootStore) {}
}
```

`ui-store.ts`
```ts
import { observable } from 'mobx';
import GlobalView from './GlobalView';
import RootStore from './../RootStore';

export default class UiStore {
  globalView: GlobalView;

  constructor(rootStore: RootStore) {}
}
```

`data-store.ts`
```ts
import { observable } from 'mobx';
import GlobalView from './GlobalView';
import RootStore from './../RootStore';

export default class DataStore {
  todoStore: TodoStore;
  userStore: UserStore;

  constructor(rootStore: RootStore) {
    this.todoStore = new TodoStore(rootStore);
    this.userStore = new UserStore(rootStore);
  }
}
```

`todo-store.ts`
```ts
import { observable } from 'mobx';
import RootStore from './RootStore';

class Todo {}

export default class UiStore {
  @observable
  list: Todo[] = [];

  constructor(private rootStore: RootStore) {}
}
```

`user-store.ts`
```ts
import { observable } from 'mobx';
import RootStore from './RootStore';

class User {}

export default class UiStore {
  @observable
  list: User[] = [];

  constructor(private rootStore: RootStore) {}
}
```