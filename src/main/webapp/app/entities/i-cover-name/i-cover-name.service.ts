import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IICoverName } from 'app/shared/model/i-cover-name.model';

type EntityResponseType = HttpResponse<IICoverName>;
type EntityArrayResponseType = HttpResponse<IICoverName[]>;

@Injectable({ providedIn: 'root' })
export class ICoverNameService {
    private resourceUrl = SERVER_API_URL + 'api/i-cover-names';

    constructor(private http: HttpClient) {}

    create(iCoverName: IICoverName): Observable<EntityResponseType> {
        return this.http.post<IICoverName>(this.resourceUrl, iCoverName, { observe: 'response' });
    }

    update(iCoverName: IICoverName): Observable<EntityResponseType> {
        return this.http.put<IICoverName>(this.resourceUrl, iCoverName, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IICoverName>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IICoverName[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
