export interface IDefaultReport {
    id?: string;
    verifiedBy?: string;
    findings?: string;
    verifiedDate?: string;
    remarks?: string;
}

export class DefaultReport implements IDefaultReport {
    constructor(
        public id?: string,
        public verifiedBy?: string,
        public findings?: string,
        public verifiedDate?: string,
        public remarks?: string
    ) {}
}
