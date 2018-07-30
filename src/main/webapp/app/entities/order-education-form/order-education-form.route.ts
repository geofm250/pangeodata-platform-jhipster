import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderEducationForm } from 'app/shared/model/order-education-form.model';
import { OrderEducationFormService } from './order-education-form.service';
import { OrderEducationFormComponent } from './order-education-form.component';
import { OrderEducationFormDetailComponent } from './order-education-form-detail.component';
import { OrderEducationFormUpdateComponent } from './order-education-form-update.component';
import { OrderEducationFormDeletePopupComponent } from './order-education-form-delete-dialog.component';
import { IOrderEducationForm } from 'app/shared/model/order-education-form.model';

@Injectable({ providedIn: 'root' })
export class OrderEducationFormResolve implements Resolve<IOrderEducationForm> {
    constructor(private service: OrderEducationFormService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderEducationForm: HttpResponse<OrderEducationForm>) => orderEducationForm.body));
        }
        return of(new OrderEducationForm());
    }
}

export const orderEducationFormRoute: Routes = [
    {
        path: 'order-education-form',
        component: OrderEducationFormComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEducationForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-education-form/:id/view',
        component: OrderEducationFormDetailComponent,
        resolve: {
            orderEducationForm: OrderEducationFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEducationForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-education-form/new',
        component: OrderEducationFormUpdateComponent,
        resolve: {
            orderEducationForm: OrderEducationFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEducationForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-education-form/:id/edit',
        component: OrderEducationFormUpdateComponent,
        resolve: {
            orderEducationForm: OrderEducationFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEducationForm.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderEducationFormPopupRoute: Routes = [
    {
        path: 'order-education-form/:id/delete',
        component: OrderEducationFormDeletePopupComponent,
        resolve: {
            orderEducationForm: OrderEducationFormResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderEducationForm.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
