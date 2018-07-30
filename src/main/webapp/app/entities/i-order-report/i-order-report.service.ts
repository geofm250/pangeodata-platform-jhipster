import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIOrderReport } from 'app/shared/model/i-order-report.model';

type EntityResponseType = HttpResponse<IIOrderReport>;
type EntityArrayResponseType = HttpResponse<IIOrderReport[]>;

@Injectable({ providedIn: 'root' })
export class IOrderReportService {
    private resourceUrl = SERVER_API_URL + 'api/i-order-reports';

    constructor(private http: HttpClient) {}

    create(iOrderReport: IIOrderReport): Observable<EntityResponseType> {
        return this.http.post<IIOrderReport>(this.resourceUrl, iOrderReport, { observe: 'response' });
    }

    update(iOrderReport: IIOrderReport): Observable<EntityResponseType> {
        return this.http.put<IIOrderReport>(this.resourceUrl, iOrderReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IIOrderReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIOrderReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
