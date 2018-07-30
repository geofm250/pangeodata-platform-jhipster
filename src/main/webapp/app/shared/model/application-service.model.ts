export interface IApplicationService {
    id?: string;
    applicationServiceId?: string;
    orderId?: string;
}

export class ApplicationService implements IApplicationService {
    constructor(public id?: string, public applicationServiceId?: string, public orderId?: string) {}
}
