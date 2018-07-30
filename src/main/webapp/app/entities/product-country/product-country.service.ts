import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductCountry } from 'app/shared/model/product-country.model';

type EntityResponseType = HttpResponse<IProductCountry>;
type EntityArrayResponseType = HttpResponse<IProductCountry[]>;

@Injectable({ providedIn: 'root' })
export class ProductCountryService {
    private resourceUrl = SERVER_API_URL + 'api/product-countries';

    constructor(private http: HttpClient) {}

    create(productCountry: IProductCountry): Observable<EntityResponseType> {
        return this.http.post<IProductCountry>(this.resourceUrl, productCountry, { observe: 'response' });
    }

    update(productCountry: IProductCountry): Observable<EntityResponseType> {
        return this.http.put<IProductCountry>(this.resourceUrl, productCountry, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IProductCountry>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductCountry[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
