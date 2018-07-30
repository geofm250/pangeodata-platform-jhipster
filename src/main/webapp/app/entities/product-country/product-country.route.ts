import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCountry } from 'app/shared/model/product-country.model';
import { ProductCountryService } from './product-country.service';
import { ProductCountryComponent } from './product-country.component';
import { ProductCountryDetailComponent } from './product-country-detail.component';
import { ProductCountryUpdateComponent } from './product-country-update.component';
import { ProductCountryDeletePopupComponent } from './product-country-delete-dialog.component';
import { IProductCountry } from 'app/shared/model/product-country.model';

@Injectable({ providedIn: 'root' })
export class ProductCountryResolve implements Resolve<IProductCountry> {
    constructor(private service: ProductCountryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((productCountry: HttpResponse<ProductCountry>) => productCountry.body));
        }
        return of(new ProductCountry());
    }
}

export const productCountryRoute: Routes = [
    {
        path: 'product-country',
        component: ProductCountryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.productCountry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-country/:id/view',
        component: ProductCountryDetailComponent,
        resolve: {
            productCountry: ProductCountryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.productCountry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-country/new',
        component: ProductCountryUpdateComponent,
        resolve: {
            productCountry: ProductCountryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.productCountry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-country/:id/edit',
        component: ProductCountryUpdateComponent,
        resolve: {
            productCountry: ProductCountryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.productCountry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productCountryPopupRoute: Routes = [
    {
        path: 'product-country/:id/delete',
        component: ProductCountryDeletePopupComponent,
        resolve: {
            productCountry: ProductCountryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.productCountry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
