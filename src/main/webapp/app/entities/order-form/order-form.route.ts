import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderForm } from 'app/shared/model/order-form.model';
import { OrderFormService } from './order-form.service';
import { OrderFormComponent } from './order-form.component';
import { OrderFormDetailComponent } from './order-form-detail.component';
import { OrderFormUpdateComponent } from './order-form-update.component';
import { OrderFormDeletePopupComponent } from './order-form-delete-dialog.component';
import { IOrderForm } from 'app/shared/model/order-form.model';

@Injectable({ providedIn: 'root' })
export class OrderFormResolve implements Resolve<IOrderForm> {
    constructor(private service: OrderFormService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderForm: HttpResponse<OrderForm>) => orderForm.body));
        }
        return of(new OrderForm());
    }
}

export const orderFormRoute: Routes = [
    {
        path: 'order-form',
        component: OrderFormComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-form/:id/view',
        component: OrderFormDetailComponent,
        resolve: {
            orderForm: OrderFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-form/new',
        component: OrderFormUpdateComponent,
        resolve: {
            orderForm: OrderFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-form/:id/edit',
        component: OrderFormUpdateComponent,
        resolve: {
            orderForm: OrderFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderFormPopupRoute: Routes = [
    {
        path: 'order-form/:id/delete',
        component: OrderFormDeletePopupComponent,
        resolve: {
            orderForm: OrderFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderForm.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
