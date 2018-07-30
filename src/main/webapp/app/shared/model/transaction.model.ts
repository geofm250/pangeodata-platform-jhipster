export interface ITransaction {
    id?: string;
    generalnformation?: string;
    addesses?: string;
    status?: string;
    statusDisplay?: string;
    editable?: string;
    editMode?: string;
    active?: string;
    cost?: string;
    referenceId?: string;
    user?: string;
    company?: string;
    createdAt?: string;
    statusNr?: string;
    redirectUrl?: string;
    consentForm?: string;
    localConsentForm?: string;
    valid?: string;
    updatedAt?: string;
    orders?: string;
}

export class Transaction implements ITransaction {
    constructor(
        public id?: string,
        public generalnformation?: string,
        public addesses?: string,
        public status?: string,
        public statusDisplay?: string,
        public editable?: string,
        public editMode?: string,
        public active?: string,
        public cost?: string,
        public referenceId?: string,
        public user?: string,
        public company?: string,
        public createdAt?: string,
        public statusNr?: string,
        public redirectUrl?: string,
        public consentForm?: string,
        public localConsentForm?: string,
        public valid?: string,
        public updatedAt?: string,
        public orders?: string
    ) {}
}
