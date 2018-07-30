import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderInput } from 'app/shared/model/order-input.model';
import { OrderInputService } from './order-input.service';
import { OrderInputComponent } from './order-input.component';
import { OrderInputDetailComponent } from './order-input-detail.component';
import { OrderInputUpdateComponent } from './order-input-update.component';
import { OrderInputDeletePopupComponent } from './order-input-delete-dialog.component';
import { IOrderInput } from 'app/shared/model/order-input.model';

@Injectable({ providedIn: 'root' })
export class OrderInputResolve implements Resolve<IOrderInput> {
    constructor(private service: OrderInputService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderInput: HttpResponse<OrderInput>) => orderInput.body));
        }
        return of(new OrderInput());
    }
}

export const orderInputRoute: Routes = [
    {
        path: 'order-input',
        component: OrderInputComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderInput.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-input/:id/view',
        component: OrderInputDetailComponent,
        resolve: {
            orderInput: OrderInputResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderInput.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-input/new',
        component: OrderInputUpdateComponent,
        resolve: {
            orderInput: OrderInputResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderInput.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-input/:id/edit',
        component: OrderInputUpdateComponent,
        resolve: {
            orderInput: OrderInputResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderInput.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderInputPopupRoute: Routes = [
    {
        path: 'order-input/:id/delete',
        component: OrderInputDeletePopupComponent,
        resolve: {
            orderInput: OrderInputResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderInput.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
