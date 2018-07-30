export interface IGeneralInformation {
    id?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    maidenName?: string;
    title?: string;
    birthDate?: string;
    referenceId?: string;
}

export class GeneralInformation implements IGeneralInformation {
    constructor(
        public id?: string,
        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public maidenName?: string,
        public title?: string,
        public birthDate?: string,
        public referenceId?: string
    ) {}
}
