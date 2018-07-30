export interface IMigration {
    id?: string;
    description?: string;
    version?: string;
}

export class Migration implements IMigration {
    constructor(public id?: string, public description?: string, public version?: string) {}
}
