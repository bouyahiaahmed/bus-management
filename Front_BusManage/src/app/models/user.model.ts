export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    age: number;
    sex: string;
    role: Role;
    username: string;
    password: string;

    constructor() {
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = 0;
        this.age = 0;
        this.sex = '';
        this.role = Role.DEFAULT;
        this.username = '';
        this.password = '';
    }
}
export enum Role {
    DEFAULT = ' ',
    ADMIN = 'ADMIN',
    DRIVER = 'DRIVER',
    RH = 'RH',
    AGENT = 'AGENT'
  }