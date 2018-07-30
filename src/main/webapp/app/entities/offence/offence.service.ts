import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOffence } from 'app/shared/model/offence.model';

type EntityResponseType = HttpResponse<IOffence>;
type EntityArrayResponseType = HttpResponse<IOffence[]>;

@Injectable({ providedIn: 'root' })
export class OffenceService {
    private resourceUrl = SERVER_API_URL + 'api/offences';

    constructor(private http: HttpClient) {}

    create(offence: IOffence): Observable<EntityResponseType> {
        return this.http.post<IOffence>(this.resourceUrl, offence, { observe: 'response' });
    }

    update(offence: IOffence): Observable<EntityResponseType> {
        return this.http.put<IOffence>(this.resourceUrl, offence, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOffence>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOffence[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
