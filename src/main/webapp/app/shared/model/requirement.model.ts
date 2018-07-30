export interface IRequirement {
    id?: string;
    name?: string;
    links?: string;
    country?: string;
    product?: string;
    type?: string;
    input?: string;
    form?: string;
    active?: string;
    createdAt?: string;
    updatedAt?: string;
    displayOrder?: string;
    displayDownloadLink?: string;
    iCoverName?: string;
}

export class Requirement implements IRequirement {
    constructor(
        public id?: string,
        public name?: string,
        public links?: string,
        public country?: string,
        public product?: string,
        public type?: string,
        public input?: string,
        public form?: string,
        public active?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public displayOrder?: string,
        public displayDownloadLink?: string,
        public iCoverName?: string
    ) {}
}
