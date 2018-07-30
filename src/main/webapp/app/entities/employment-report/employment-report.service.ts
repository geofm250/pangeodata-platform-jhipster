import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmploymentReport } from 'app/shared/model/employment-report.model';

type EntityResponseType = HttpResponse<IEmploymentReport>;
type EntityArrayResponseType = HttpResponse<IEmploymentReport[]>;

@Injectable({ providedIn: 'root' })
export class EmploymentReportService {
    private resourceUrl = SERVER_API_URL + 'api/employment-reports';

    constructor(private http: HttpClient) {}

    create(employmentReport: IEmploymentReport): Observable<EntityResponseType> {
        return this.http.post<IEmploymentReport>(this.resourceUrl, employmentReport, { observe: 'response' });
    }

    update(employmentReport: IEmploymentReport): Observable<EntityResponseType> {
        return this.http.put<IEmploymentReport>(this.resourceUrl, employmentReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IEmploymentReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmploymentReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
