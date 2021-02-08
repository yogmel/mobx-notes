import { makeAutoObservable } from "mobx";

export interface TodoDTO {
    id: number;
    userId: number;
    description: string;
    isCompleted?: boolean;
}

export class Todo {
    constructor(
      private _id: number,
      private _userId: number,
      private _description: string,
      private _isCompleted = false
    ) {
      makeAutoObservable(this);
    }
  
    get id() {
      return this._id;
    }

    get userId() {
      return this._userId;
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
