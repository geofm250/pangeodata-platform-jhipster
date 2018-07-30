import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILicenseCheckReport } from 'app/shared/model/license-check-report.model';

type EntityResponseType = HttpResponse<ILicenseCheckReport>;
type EntityArrayResponseType = HttpResponse<ILicenseCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class LicenseCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/license-check-reports';

    constructor(private http: HttpClient) {}

    create(licenseCheckReport: ILicenseCheckReport): Observable<EntityResponseType> {
        return this.http.post<ILicenseCheckReport>(this.resourceUrl, licenseCheckReport, { observe: 'response' });
    }

    update(licenseCheckReport: ILicenseCheckReport): Observable<EntityResponseType> {
        return this.http.put<ILicenseCheckReport>(this.resourceUrl, licenseCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ILicenseCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILicenseCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
