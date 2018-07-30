import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';

type EntityResponseType = HttpResponse<IOrderProfessionalLicenseForm>;
type EntityArrayResponseType = HttpResponse<IOrderProfessionalLicenseForm[]>;

@Injectable({ providedIn: 'root' })
export class OrderProfessionalLicenseFormService {
    private resourceUrl = SERVER_API_URL + 'api/order-professional-license-forms';

    constructor(private http: HttpClient) {}

    create(orderProfessionalLicenseForm: IOrderProfessionalLicenseForm): Observable<EntityResponseType> {
        return this.http.post<IOrderProfessionalLicenseForm>(this.resourceUrl, orderProfessionalLicenseForm, { observe: 'response' });
    }

    update(orderProfessionalLicenseForm: IOrderProfessionalLicenseForm): Observable<EntityResponseType> {
        return this.http.put<IOrderProfessionalLicenseForm>(this.resourceUrl, orderProfessionalLicenseForm, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IOrderProfessionalLicenseForm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderProfessionalLicenseForm[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
