import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';
import { OrderProfessionalLicenseFormService } from './order-professional-license-form.service';
import { OrderProfessionalLicenseFormComponent } from './order-professional-license-form.component';
import { OrderProfessionalLicenseFormDetailComponent } from './order-professional-license-form-detail.component';
import { OrderProfessionalLicenseFormUpdateComponent } from './order-professional-license-form-update.component';
import { OrderProfessionalLicenseFormDeletePopupComponent } from './order-professional-license-form-delete-dialog.component';
import { IOrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';

@Injectable({ providedIn: 'root' })
export class OrderProfessionalLicenseFormResolve implements Resolve<IOrderProfessionalLicenseForm> {
    constructor(private service: OrderProfessionalLicenseFormService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((orderProfessionalLicenseForm: HttpResponse<OrderProfessionalLicenseForm>) => orderProfessionalLicenseForm.body));
        }
        return of(new OrderProfessionalLicenseForm());
    }
}

export const orderProfessionalLicenseFormRoute: Routes = [
    {
        path: 'order-professional-license-form',
        component: OrderProfessionalLicenseFormComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderProfessionalLicenseForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-professional-license-form/:id/view',
        component: OrderProfessionalLicenseFormDetailComponent,
        resolve: {
            orderProfessionalLicenseForm: OrderProfessionalLicenseFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderProfessionalLicenseForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-professional-license-form/new',
        component: OrderProfessionalLicenseFormUpdateComponent,
        resolve: {
            orderProfessionalLicenseForm: OrderProfessionalLicenseFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderProfessionalLicenseForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-professional-license-form/:id/edit',
        component: OrderProfessionalLicenseFormUpdateComponent,
        resolve: {
            orderProfessionalLicenseForm: OrderProfessionalLicenseFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderProfessionalLicenseForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderProfessionalLicenseFormPopupRoute: Routes = [
    {
        path: 'order-professional-license-form/:id/delete',
        component: OrderProfessionalLicenseFormDeletePopupComponent,
        resolve: {
            orderProfessionalLicenseForm: OrderProfessionalLicenseFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderProfessionalLicenseForm.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
