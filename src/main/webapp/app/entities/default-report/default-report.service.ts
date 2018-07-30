import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDefaultReport } from 'app/shared/model/default-report.model';

type EntityResponseType = HttpResponse<IDefaultReport>;
type EntityArrayResponseType = HttpResponse<IDefaultReport[]>;

@Injectable({ providedIn: 'root' })
export class DefaultReportService {
    private resourceUrl = SERVER_API_URL + 'api/default-reports';

    constructor(private http: HttpClient) {}

    create(defaultReport: IDefaultReport): Observable<EntityResponseType> {
        return this.http.post<IDefaultReport>(this.resourceUrl, defaultReport, { observe: 'response' });
    }

    update(defaultReport: IDefaultReport): Observable<EntityResponseType> {
        return this.http.put<IDefaultReport>(this.resourceUrl, defaultReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IDefaultReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDefaultReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
