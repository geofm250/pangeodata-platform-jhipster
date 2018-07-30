import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICreditCheckReport } from 'app/shared/model/credit-check-report.model';

type EntityResponseType = HttpResponse<ICreditCheckReport>;
type EntityArrayResponseType = HttpResponse<ICreditCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class CreditCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/credit-check-reports';

    constructor(private http: HttpClient) {}

    create(creditCheckReport: ICreditCheckReport): Observable<EntityResponseType> {
        return this.http.post<ICreditCheckReport>(this.resourceUrl, creditCheckReport, { observe: 'response' });
    }

    update(creditCheckReport: ICreditCheckReport): Observable<EntityResponseType> {
        return this.http.put<ICreditCheckReport>(this.resourceUrl, creditCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICreditCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICreditCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
