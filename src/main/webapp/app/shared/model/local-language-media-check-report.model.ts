export interface ILocalLanguageMediaCheckReport {
    id?: string;
    localLanguageMediaFindings?: string;
    localLanguageMediaStatus?: string;
    localLanguageMediaVerifiedDate?: string;
}

export class LocalLanguageMediaCheckReport implements ILocalLanguageMediaCheckReport {
    constructor(
        public id?: string,
        public localLanguageMediaFindings?: string,
        public localLanguageMediaStatus?: string,
        public localLanguageMediaVerifiedDate?: string
    ) {}
}
