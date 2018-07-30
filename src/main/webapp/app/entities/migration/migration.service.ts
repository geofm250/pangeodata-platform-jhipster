import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMigration } from 'app/shared/model/migration.model';

type EntityResponseType = HttpResponse<IMigration>;
type EntityArrayResponseType = HttpResponse<IMigration[]>;

@Injectable({ providedIn: 'root' })
export class MigrationService {
    private resourceUrl = SERVER_API_URL + 'api/migrations';

    constructor(private http: HttpClient) {}

    create(migration: IMigration): Observable<EntityResponseType> {
        return this.http.post<IMigration>(this.resourceUrl, migration, { observe: 'response' });
    }

    update(migration: IMigration): Observable<EntityResponseType> {
        return this.http.put<IMigration>(this.resourceUrl, migration, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IMigration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMigration[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
