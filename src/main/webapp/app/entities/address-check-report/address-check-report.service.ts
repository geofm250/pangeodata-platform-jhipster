import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddressCheckReport } from 'app/shared/model/address-check-report.model';

type EntityResponseType = HttpResponse<IAddressCheckReport>;
type EntityArrayResponseType = HttpResponse<IAddressCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class AddressCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/address-check-reports';

    constructor(private http: HttpClient) {}

    create(addressCheckReport: IAddressCheckReport): Observable<EntityResponseType> {
        return this.http.post<IAddressCheckReport>(this.resourceUrl, addressCheckReport, { observe: 'response' });
    }

    update(addressCheckReport: IAddressCheckReport): Observable<EntityResponseType> {
        return this.http.put<IAddressCheckReport>(this.resourceUrl, addressCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IAddressCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAddressCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
