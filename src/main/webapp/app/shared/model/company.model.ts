export interface ICompany {
    id?: string;
    name?: string;
    role?: string;
    user?: string;
    createdAt?: string;
    updatedAt?: string;
    active?: string;
    automated?: string;
}

export class Company implements ICompany {
    constructor(
        public id?: string,
        public name?: string,
        public role?: string,
        public user?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public active?: string,
        public automated?: string
    ) {}
}
