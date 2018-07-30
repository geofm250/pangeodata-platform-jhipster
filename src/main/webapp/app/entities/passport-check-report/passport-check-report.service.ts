import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPassportCheckReport } from 'app/shared/model/passport-check-report.model';

type EntityResponseType = HttpResponse<IPassportCheckReport>;
type EntityArrayResponseType = HttpResponse<IPassportCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class PassportCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/passport-check-reports';

    constructor(private http: HttpClient) {}

    create(passportCheckReport: IPassportCheckReport): Observable<EntityResponseType> {
        return this.http.post<IPassportCheckReport>(this.resourceUrl, passportCheckReport, { observe: 'response' });
    }

    update(passportCheckReport: IPassportCheckReport): Observable<EntityResponseType> {
        return this.http.put<IPassportCheckReport>(this.resourceUrl, passportCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IPassportCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPassportCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
