import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICriminalRecordReport } from 'app/shared/model/criminal-record-report.model';

type EntityResponseType = HttpResponse<ICriminalRecordReport>;
type EntityArrayResponseType = HttpResponse<ICriminalRecordReport[]>;

@Injectable({ providedIn: 'root' })
export class CriminalRecordReportService {
    private resourceUrl = SERVER_API_URL + 'api/criminal-record-reports';

    constructor(private http: HttpClient) {}

    create(criminalRecordReport: ICriminalRecordReport): Observable<EntityResponseType> {
        return this.http.post<ICriminalRecordReport>(this.resourceUrl, criminalRecordReport, { observe: 'response' });
    }

    update(criminalRecordReport: ICriminalRecordReport): Observable<EntityResponseType> {
        return this.http.put<ICriminalRecordReport>(this.resourceUrl, criminalRecordReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICriminalRecordReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICriminalRecordReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
