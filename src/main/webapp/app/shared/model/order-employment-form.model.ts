export interface IOrderEmploymentForm {
    id?: string;
    employerName?: string;
    managerName?: string;
    endingPay?: string;
    rehireEligibility?: string;
    institutionLocalName?: string;
    sourceWebsite?: string;
    sourcePhone?: string;
    sourceEmail?: string;
    present?: string;
    employmentStartDate?: string;
    employmentEndDate?: string;
    endingPosition?: string;
    startingPosition?: string;
    startingPay?: string;
    street?: string;
    postalCode?: string;
    reasonForLeaving?: string;
    notes?: string;
}

export class OrderEmploymentForm implements IOrderEmploymentForm {
    constructor(
        public id?: string,
        public employerName?: string,
        public managerName?: string,
        public endingPay?: string,
        public rehireEligibility?: string,
        public institutionLocalName?: string,
        public sourceWebsite?: string,
        public sourcePhone?: string,
        public sourceEmail?: string,
        public present?: string,
        public employmentStartDate?: string,
        public employmentEndDate?: string,
        public endingPosition?: string,
        public startingPosition?: string,
        public startingPay?: string,
        public street?: string,
        public postalCode?: string,
        public reasonForLeaving?: string,
        public notes?: string
    ) {}
}
