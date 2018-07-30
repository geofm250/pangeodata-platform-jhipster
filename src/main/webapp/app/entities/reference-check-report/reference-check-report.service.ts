import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReferenceCheckReport } from 'app/shared/model/reference-check-report.model';

type EntityResponseType = HttpResponse<IReferenceCheckReport>;
type EntityArrayResponseType = HttpResponse<IReferenceCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class ReferenceCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/reference-check-reports';

    constructor(private http: HttpClient) {}

    create(referenceCheckReport: IReferenceCheckReport): Observable<EntityResponseType> {
        return this.http.post<IReferenceCheckReport>(this.resourceUrl, referenceCheckReport, { observe: 'response' });
    }

    update(referenceCheckReport: IReferenceCheckReport): Observable<EntityResponseType> {
        return this.http.put<IReferenceCheckReport>(this.resourceUrl, referenceCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IReferenceCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReferenceCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
