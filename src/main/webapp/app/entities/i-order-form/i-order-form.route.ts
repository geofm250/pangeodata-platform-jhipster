import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrderForm } from 'app/shared/model/i-order-form.model';
import { IOrderFormService } from './i-order-form.service';
import { IOrderFormComponent } from './i-order-form.component';
import { IOrderFormDetailComponent } from './i-order-form-detail.component';
import { IOrderFormUpdateComponent } from './i-order-form-update.component';
import { IOrderFormDeletePopupComponent } from './i-order-form-delete-dialog.component';
import { IIOrderForm } from 'app/shared/model/i-order-form.model';

@Injectable({ providedIn: 'root' })
export class IOrderFormResolve implements Resolve<IIOrderForm> {
    constructor(private service: IOrderFormService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((iOrderForm: HttpResponse<IOrderForm>) => iOrderForm.body));
        }
        return of(new IOrderForm());
    }
}

export const iOrderFormRoute: Routes = [
    {
        path: 'i-order-form',
        component: IOrderFormComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-order-form/:id/view',
        component: IOrderFormDetailComponent,
        resolve: {
            iOrderForm: IOrderFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-order-form/new',
        component: IOrderFormUpdateComponent,
        resolve: {
            iOrderForm: IOrderFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-order-form/:id/edit',
        component: IOrderFormUpdateComponent,
        resolve: {
            iOrderForm: IOrderFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iOrderFormPopupRoute: Routes = [
    {
        path: 'i-order-form/:id/delete',
        component: IOrderFormDeletePopupComponent,
        resolve: {
            iOrderForm: IOrderFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderForm.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
