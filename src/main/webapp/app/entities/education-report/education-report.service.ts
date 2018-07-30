import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEducationReport } from 'app/shared/model/education-report.model';

type EntityResponseType = HttpResponse<IEducationReport>;
type EntityArrayResponseType = HttpResponse<IEducationReport[]>;

@Injectable({ providedIn: 'root' })
export class EducationReportService {
    private resourceUrl = SERVER_API_URL + 'api/education-reports';

    constructor(private http: HttpClient) {}

    create(educationReport: IEducationReport): Observable<EntityResponseType> {
        return this.http.post<IEducationReport>(this.resourceUrl, educationReport, { observe: 'response' });
    }

    update(educationReport: IEducationReport): Observable<EntityResponseType> {
        return this.http.put<IEducationReport>(this.resourceUrl, educationReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IEducationReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEducationReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
