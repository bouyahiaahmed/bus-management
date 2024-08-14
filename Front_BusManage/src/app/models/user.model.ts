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
    assignedcredentials: boolean ;

    constructor() {
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = 0;
        this.age = 0;
        this.sex = '';
        this.role = Role.empty;
        this.username = '';
        this.password = '';
        this.assignedcredentials = false;
    }
}
export enum Role {
    ADMIN = 'ADMIN',
    DRIVER = 'DRIVER',
    RH = 'RH',
    AGENT = 'AGENT',
    empty = ''
  }