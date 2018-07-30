export interface IOrderFile {
    id?: string;
    name?: string;
    localFiles?: string;
    files?: string;
    links?: string;
    displayLinks?: string;
    iCoverName?: string;
    orderId?: string;
}

export class OrderFile implements IOrderFile {
    constructor(
        public id?: string,
        public name?: string,
        public localFiles?: string,
        public files?: string,
        public links?: string,
        public displayLinks?: string,
        public iCoverName?: string,
        public orderId?: string
    ) {}
}
