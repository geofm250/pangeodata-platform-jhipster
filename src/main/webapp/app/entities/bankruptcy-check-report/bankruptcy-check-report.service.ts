import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';

type EntityResponseType = HttpResponse<IBankruptcyCheckReport>;
type EntityArrayResponseType = HttpResponse<IBankruptcyCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class BankruptcyCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/bankruptcy-check-reports';

    constructor(private http: HttpClient) {}

    create(bankruptcyCheckReport: IBankruptcyCheckReport): Observable<EntityResponseType> {
        return this.http.post<IBankruptcyCheckReport>(this.resourceUrl, bankruptcyCheckReport, { observe: 'response' });
    }

    update(bankruptcyCheckReport: IBankruptcyCheckReport): Observable<EntityResponseType> {
        return this.http.put<IBankruptcyCheckReport>(this.resourceUrl, bankruptcyCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IBankruptcyCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBankruptcyCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
