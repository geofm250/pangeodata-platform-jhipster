import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';

type EntityResponseType = HttpResponse<ILocalLanguageMediaCheckReport>;
type EntityArrayResponseType = HttpResponse<ILocalLanguageMediaCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class LocalLanguageMediaCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/local-language-media-check-reports';

    constructor(private http: HttpClient) {}

    create(localLanguageMediaCheckReport: ILocalLanguageMediaCheckReport): Observable<EntityResponseType> {
        return this.http.post<ILocalLanguageMediaCheckReport>(this.resourceUrl, localLanguageMediaCheckReport, { observe: 'response' });
    }

    update(localLanguageMediaCheckReport: ILocalLanguageMediaCheckReport): Observable<EntityResponseType> {
        return this.http.put<ILocalLanguageMediaCheckReport>(this.resourceUrl, localLanguageMediaCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ILocalLanguageMediaCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILocalLanguageMediaCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
