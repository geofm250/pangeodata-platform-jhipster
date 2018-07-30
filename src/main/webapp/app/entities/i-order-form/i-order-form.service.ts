import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIOrderForm } from 'app/shared/model/i-order-form.model';

type EntityResponseType = HttpResponse<IIOrderForm>;
type EntityArrayResponseType = HttpResponse<IIOrderForm[]>;

@Injectable({ providedIn: 'root' })
export class IOrderFormService {
    private resourceUrl = SERVER_API_URL + 'api/i-order-forms';

    constructor(private http: HttpClient) {}

    create(iOrderForm: IIOrderForm): Observable<EntityResponseType> {
        return this.http.post<IIOrderForm>(this.resourceUrl, iOrderForm, { observe: 'response' });
    }

    update(iOrderForm: IIOrderForm): Observable<EntityResponseType> {
        return this.http.put<IIOrderForm>(this.resourceUrl, iOrderForm, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IIOrderForm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIOrderForm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
