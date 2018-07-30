export interface IOrderEducationForm {
    id?: string;
    typeDiploma?: string;
    nameOfInstitution?: string;
    institutionLocalName?: string;
    subject?: string;
    performance?: string;
    typeOfInstitution?: string;
    sourceWebsite?: string;
    sourceName?: string;
    sourcePhone?: string;
    sourceEmail?: string;
    present?: string;
    attendanceStartDate?: string;
    attendanceEndDate?: string;
    diplomaAwardDate?: string;
    studentRegistrationNo?: string;
    town?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    notes?: string;
}

export class OrderEducationForm implements IOrderEducationForm {
    constructor(
        public id?: string,
        public typeDiploma?: string,
        public nameOfInstitution?: string,
        public institutionLocalName?: string,
        public subject?: string,
        public performance?: string,
        public typeOfInstitution?: string,
        public sourceWebsite?: string,
        public sourceName?: string,
        public sourcePhone?: string,
        public sourceEmail?: string,
        public present?: string,
        public attendanceStartDate?: string,
        public attendanceEndDate?: string,
        public diplomaAwardDate?: string,
        public studentRegistrationNo?: string,
        public town?: string,
        public state?: string,
        public country?: string,
        public postalCode?: string,
        public notes?: string
    ) {}
}
