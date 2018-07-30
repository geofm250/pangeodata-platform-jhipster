export interface IProduct {
    id?: string;
    active?: string;
    name?: string;
    description?: string;
    turnAroundTime?: string;
    cost?: string;
    countries?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class Product implements IProduct {
    constructor(
        public id?: string,
        public active?: string,
        public name?: string,
        public description?: string,
        public turnAroundTime?: string,
        public cost?: string,
        public countries?: string,
        public createdAt?: string,
        public updatedAt?: string
    ) {}
}
