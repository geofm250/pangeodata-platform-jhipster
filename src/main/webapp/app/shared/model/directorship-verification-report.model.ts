export interface IDirectorshipVerificationReport {
    id?: string;
    directorshipVerified?: string;
    directorshipFindings?: string;
    directorshipVerifiedBy?: string;
    directorshipVerifiedDate?: string;
}

export class DirectorshipVerificationReport implements IDirectorshipVerificationReport {
    constructor(
        public id?: string,
        public directorshipVerified?: string,
        public directorshipFindings?: string,
        public directorshipVerifiedBy?: string,
        public directorshipVerifiedDate?: string
    ) {}
}
