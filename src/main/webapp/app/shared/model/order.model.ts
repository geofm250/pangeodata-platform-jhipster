export interface IOrder {
    id?: string;
    files?: string;
    reqInputs?: string;
    reqFormInputs?: string;
    product?: string;
    transaction?: string;
    user?: string;
    status?: string;
    rejectReason?: string;
    company?: string;
    partner?: string;
    country?: string;
    createdAt?: string;
    updatedAt?: string;
    expectedDate?: string;
    dayTillComplete?: string;
    cost?: string;
    turnAroundTime?: string;
    report?: string;
    refereneceId?: string;
    cancellationReason?: string;
    clientId?: string;
    active?: string;
    selected?: string;
    applicationId?: string;
    applicationServiceIds?: string;
    iCoverReport?: string;
}

export class Order implements IOrder {
    constructor(
        public id?: string,
        public files?: string,
        public reqInputs?: string,
        public reqFormInputs?: string,
        public product?: string,
        public transaction?: string,
        public user?: string,
        public status?: string,
        public rejectReason?: string,
        public company?: string,
        public partner?: string,
        public country?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public expectedDate?: string,
        public dayTillComplete?: string,
        public cost?: string,
        public turnAroundTime?: string,
        public report?: string,
        public refereneceId?: string,
        public cancellationReason?: string,
        public clientId?: string,
        public active?: string,
        public selected?: string,
        public applicationId?: string,
        public applicationServiceIds?: string,
        public iCoverReport?: string
    ) {}
}
