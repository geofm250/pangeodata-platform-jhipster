import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';

type EntityResponseType = HttpResponse<IDriversLicenseCheckReport>;
type EntityArrayResponseType = HttpResponse<IDriversLicenseCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class DriversLicenseCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/drivers-license-check-reports';

    constructor(private http: HttpClient) {}

    create(driversLicenseCheckReport: IDriversLicenseCheckReport): Observable<EntityResponseType> {
        return this.http.post<IDriversLicenseCheckReport>(this.resourceUrl, driversLicenseCheckReport, { observe: 'response' });
    }

    update(driversLicenseCheckReport: IDriversLicenseCheckReport): Observable<EntityResponseType> {
        return this.http.put<IDriversLicenseCheckReport>(this.resourceUrl, driversLicenseCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IDriversLicenseCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDriversLicenseCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
