export interface ICustomUser {
    id?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    role?: string;
    company?: string;
    name?: string;
    surname?: string;
    password?: string;
    active?: string;
    createdAt?: string;
    updatedAt?: string;
    isTokenLogin?: string;
    orderId?: string;
}

export class CustomUser implements ICustomUser {
    constructor(
        public id?: string,
        public firstname?: string,
        public lastname?: string,
        public username?: string,
        public email?: string,
        public role?: string,
        public company?: string,
        public name?: string,
        public surname?: string,
        public password?: string,
        public active?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public isTokenLogin?: string,
        public orderId?: string
    ) {}
}
