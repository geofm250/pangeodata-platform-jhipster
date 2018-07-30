import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';

type EntityResponseType = HttpResponse<IReportedCriminalActivityCheck>;
type EntityArrayResponseType = HttpResponse<IReportedCriminalActivityCheck[]>;

@Injectable({ providedIn: 'root' })
export class ReportedCriminalActivityCheckService {
    private resourceUrl = SERVER_API_URL + 'api/reported-criminal-activity-checks';

    constructor(private http: HttpClient) {}

    create(reportedCriminalActivityCheck: IReportedCriminalActivityCheck): Observable<EntityResponseType> {
        return this.http.post<IReportedCriminalActivityCheck>(this.resourceUrl, reportedCriminalActivityCheck, { observe: 'response' });
    }

    update(reportedCriminalActivityCheck: IReportedCriminalActivityCheck): Observable<EntityResponseType> {
        return this.http.put<IReportedCriminalActivityCheck>(this.resourceUrl, reportedCriminalActivityCheck, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IReportedCriminalActivityCheck>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReportedCriminalActivityCheck[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
