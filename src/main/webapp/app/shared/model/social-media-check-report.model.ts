export interface ISocialMediaCheckReport {
    id?: string;
    socialMediaSourcesChecked?: string;
    socialMediaFindings?: string;
    socialMediaVerifiedDate?: string;
}

export class SocialMediaCheckReport implements ISocialMediaCheckReport {
    constructor(
        public id?: string,
        public socialMediaSourcesChecked?: string,
        public socialMediaFindings?: string,
        public socialMediaVerifiedDate?: string
    ) {}
}
