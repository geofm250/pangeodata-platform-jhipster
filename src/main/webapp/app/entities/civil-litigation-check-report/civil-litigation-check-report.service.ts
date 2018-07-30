import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';

type EntityResponseType = HttpResponse<ICivilLitigationCheckReport>;
type EntityArrayResponseType = HttpResponse<ICivilLitigationCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class CivilLitigationCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/civil-litigation-check-reports';

    constructor(private http: HttpClient) {}

    create(civilLitigationCheckReport: ICivilLitigationCheckReport): Observable<EntityResponseType> {
        return this.http.post<ICivilLitigationCheckReport>(this.resourceUrl, civilLitigationCheckReport, { observe: 'response' });
    }

    update(civilLitigationCheckReport: ICivilLitigationCheckReport): Observable<EntityResponseType> {
        return this.http.put<ICivilLitigationCheckReport>(this.resourceUrl, civilLitigationCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ICivilLitigationCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICivilLitigationCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
