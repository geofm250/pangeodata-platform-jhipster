import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderFile } from 'app/shared/model/order-file.model';

type EntityResponseType = HttpResponse<IOrderFile>;
type EntityArrayResponseType = HttpResponse<IOrderFile[]>;

@Injectable({ providedIn: 'root' })
export class OrderFileService {
    private resourceUrl = SERVER_API_URL + 'api/order-files';

    constructor(private http: HttpClient) {}

    create(orderFile: IOrderFile): Observable<EntityResponseType> {
        return this.http.post<IOrderFile>(this.resourceUrl, orderFile, { observe: 'response' });
    }

    update(orderFile: IOrderFile): Observable<EntityResponseType> {
        return this.http.put<IOrderFile>(this.resourceUrl, orderFile, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOrderFile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderFile[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
