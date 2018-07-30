import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApplicationService } from 'app/shared/model/application-service.model';

type EntityResponseType = HttpResponse<IApplicationService>;
type EntityArrayResponseType = HttpResponse<IApplicationService[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationServiceService {
    private resourceUrl = SERVER_API_URL + 'api/application-services';

    constructor(private http: HttpClient) {}

    create(applicationService: IApplicationService): Observable<EntityResponseType> {
        return this.http.post<IApplicationService>(this.resourceUrl, applicationService, { observe: 'response' });
    }

    update(applicationService: IApplicationService): Observable<EntityResponseType> {
        return this.http.put<IApplicationService>(this.resourceUrl, applicationService, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IApplicationService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IApplicationService[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
