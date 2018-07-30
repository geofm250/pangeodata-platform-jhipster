import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderEmploymentForm } from 'app/shared/model/order-employment-form.model';
import { OrderEmploymentFormService } from './order-employment-form.service';
import { OrderEmploymentFormComponent } from './order-employment-form.component';
import { OrderEmploymentFormDetailComponent } from './order-employment-form-detail.component';
import { OrderEmploymentFormUpdateComponent } from './order-employment-form-update.component';
import { OrderEmploymentFormDeletePopupComponent } from './order-employment-form-delete-dialog.component';
import { IOrderEmploymentForm } from 'app/shared/model/order-employment-form.model';

@Injectable({ providedIn: 'root' })
export class OrderEmploymentFormResolve implements Resolve<IOrderEmploymentForm> {
    constructor(private service: OrderEmploymentFormService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderEmploymentForm: HttpResponse<OrderEmploymentForm>) => orderEmploymentForm.body));
        }
        return of(new OrderEmploymentForm());
    }
}

export const orderEmploymentFormRoute: Routes = [
    {
        path: 'order-employment-form',
        component: OrderEmploymentFormComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEmploymentForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-employment-form/:id/view',
        component: OrderEmploymentFormDetailComponent,
        resolve: {
            orderEmploymentForm: OrderEmploymentFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEmploymentForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-employment-form/new',
        component: OrderEmploymentFormUpdateComponent,
        resolve: {
            orderEmploymentForm: OrderEmploymentFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEmploymentForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-employment-form/:id/edit',
        component: OrderEmploymentFormUpdateComponent,
        resolve: {
            orderEmploymentForm: OrderEmploymentFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEmploymentForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderEmploymentFormPopupRoute: Routes = [
    {
        path: 'order-employment-form/:id/delete',
        component: OrderEmploymentFormDeletePopupComponent,
        resolve: {
            orderEmploymentForm: OrderEmploymentFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEmploymentForm.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
