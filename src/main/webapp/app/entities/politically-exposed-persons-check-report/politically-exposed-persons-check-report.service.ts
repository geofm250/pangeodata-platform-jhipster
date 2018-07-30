import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';

type EntityResponseType = HttpResponse<IPoliticallyExposedPersonsCheckReport>;
type EntityArrayResponseType = HttpResponse<IPoliticallyExposedPersonsCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class PoliticallyExposedPersonsCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/politically-exposed-persons-check-reports';

    constructor(private http: HttpClient) {}

    create(politicallyExposedPersonsCheckReport: IPoliticallyExposedPersonsCheckReport): Observable<EntityResponseType> {
        return this.http.post<IPoliticallyExposedPersonsCheckReport>(this.resourceUrl, politicallyExposedPersonsCheckReport, {
            observe: 'response'
        });
    }

    update(politicallyExposedPersonsCheckReport: IPoliticallyExposedPersonsCheckReport): Observable<EntityResponseType> {
        return this.http.put<IPoliticallyExposedPersonsCheckReport>(this.resourceUrl, politicallyExposedPersonsCheckReport, {
            observe: 'response'
        });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IPoliticallyExposedPersonsCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPoliticallyExposedPersonsCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
