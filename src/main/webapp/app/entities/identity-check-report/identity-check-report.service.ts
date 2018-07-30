import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIdentityCheckReport } from 'app/shared/model/identity-check-report.model';

type EntityResponseType = HttpResponse<IIdentityCheckReport>;
type EntityArrayResponseType = HttpResponse<IIdentityCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class IdentityCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/identity-check-reports';

    constructor(private http: HttpClient) {}

    create(identityCheckReport: IIdentityCheckReport): Observable<EntityResponseType> {
        return this.http.post<IIdentityCheckReport>(this.resourceUrl, identityCheckReport, { observe: 'response' });
    }

    update(identityCheckReport: IIdentityCheckReport): Observable<EntityResponseType> {
        return this.http.put<IIdentityCheckReport>(this.resourceUrl, identityCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IIdentityCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIdentityCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
