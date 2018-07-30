import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderInput } from 'app/shared/model/order-input.model';

type EntityResponseType = HttpResponse<IOrderInput>;
type EntityArrayResponseType = HttpResponse<IOrderInput[]>;

@Injectable({ providedIn: 'root' })
export class OrderInputService {
    private resourceUrl = SERVER_API_URL + 'api/order-inputs';

    constructor(private http: HttpClient) {}

    create(orderInput: IOrderInput): Observable<EntityResponseType> {
        return this.http.post<IOrderInput>(this.resourceUrl, orderInput, { observe: 'response' });
    }

    update(orderInput: IOrderInput): Observable<EntityResponseType> {
        return this.http.put<IOrderInput>(this.resourceUrl, orderInput, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOrderInput>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderInput[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
