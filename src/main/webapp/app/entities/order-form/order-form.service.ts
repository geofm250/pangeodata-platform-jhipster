import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderForm } from 'app/shared/model/order-form.model';

type EntityResponseType = HttpResponse<IOrderForm>;
type EntityArrayResponseType = HttpResponse<IOrderForm[]>;

@Injectable({ providedIn: 'root' })
export class OrderFormService {
    private resourceUrl = SERVER_API_URL + 'api/order-forms';

    constructor(private http: HttpClient) {}

    create(orderForm: IOrderForm): Observable<EntityResponseType> {
        return this.http.post<IOrderForm>(this.resourceUrl, orderForm, { observe: 'response' });
    }

    update(orderForm: IOrderForm): Observable<EntityResponseType> {
        return this.http.put<IOrderForm>(this.resourceUrl, orderForm, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOrderForm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderForm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
