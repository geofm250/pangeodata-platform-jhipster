export interface IOffence {
    id?: string;
    offence?: string;
    offenceDate?: string;
    sentence?: string;
    verifiedBy?: string;
    verifiedDate?: string;
    remarks?: string;
}

export class Offence implements IOffence {
    constructor(
        public id?: string,
        public offence?: string,
        public offenceDate?: string,
        public sentence?: string,
        public verifiedBy?: string,
        public verifiedDate?: string,
        public remarks?: string
    ) {}
}
