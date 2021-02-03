export class TodoViewModel {
  constructor(
    private _id: number,
    private _description: string,
    private _isCompleted: boolean
  ) {}

  get id() {
    return this._id;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  get description() {
    return this._description;
  }

  set isCompleted(value: boolean) {
    this._isCompleted = value;
  }

  set description(value: string) {
    this._description = value;
  }
}
