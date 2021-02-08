export interface UserDTO {
    id: number;
    name: string;
}

export default class User {
    constructor(public id: number, public name: string) {}
}
