export interface IFile {
    id?: string;
    url?: string;
    orderFileId?: string;
}

export class File implements IFile {
    constructor(public id?: string, public url?: string, public orderFileId?: string) {}
}
