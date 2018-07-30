import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderEducationForm } from 'app/shared/model/order-education-form.model';

type EntityResponseType = HttpResponse<IOrderEducationForm>;
type EntityArrayResponseType = HttpResponse<IOrderEducationForm[]>;

@Injectable({ providedIn: 'root' })
export class OrderEducationFormService {
    private resourceUrl = SERVER_API_URL + 'api/order-education-forms';

    constructor(private http: HttpClient) {}

    create(orderEducationForm: IOrderEducationForm): Observable<EntityResponseType> {
        return this.http.post<IOrderEducationForm>(this.resourceUrl, orderEducationForm, { observe: 'response' });
    }

    update(orderEducationForm: IOrderEducationForm): Observable<EntityResponseType> {
        return this.http.put<IOrderEducationForm>(this.resourceUrl, orderEducationForm, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOrderEducationForm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderEducationForm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
