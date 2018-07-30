import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderEmploymentForm } from 'app/shared/model/order-employment-form.model';

type EntityResponseType = HttpResponse<IOrderEmploymentForm>;
type EntityArrayResponseType = HttpResponse<IOrderEmploymentForm[]>;

@Injectable({ providedIn: 'root' })
export class OrderEmploymentFormService {
    private resourceUrl = SERVER_API_URL + 'api/order-employment-forms';

    constructor(private http: HttpClient) {}

    create(orderEmploymentForm: IOrderEmploymentForm): Observable<EntityResponseType> {
        return this.http.post<IOrderEmploymentForm>(this.resourceUrl, orderEmploymentForm, { observe: 'response' });
    }

    update(orderEmploymentForm: IOrderEmploymentForm): Observable<EntityResponseType> {
        return this.http.put<IOrderEmploymentForm>(this.resourceUrl, orderEmploymentForm, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOrderEmploymentForm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderEmploymentForm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
