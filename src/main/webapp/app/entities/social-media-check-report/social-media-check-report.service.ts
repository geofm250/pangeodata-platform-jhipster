import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';

type EntityResponseType = HttpResponse<ISocialMediaCheckReport>;
type EntityArrayResponseType = HttpResponse<ISocialMediaCheckReport[]>;

@Injectable({ providedIn: 'root' })
export class SocialMediaCheckReportService {
    private resourceUrl = SERVER_API_URL + 'api/social-media-check-reports';

    constructor(private http: HttpClient) {}

    create(socialMediaCheckReport: ISocialMediaCheckReport): Observable<EntityResponseType> {
        return this.http.post<ISocialMediaCheckReport>(this.resourceUrl, socialMediaCheckReport, { observe: 'response' });
    }

    update(socialMediaCheckReport: ISocialMediaCheckReport): Observable<EntityResponseType> {
        return this.http.put<ISocialMediaCheckReport>(this.resourceUrl, socialMediaCheckReport, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ISocialMediaCheckReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISocialMediaCheckReport[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
