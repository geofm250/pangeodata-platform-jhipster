import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderFile } from 'app/shared/model/order-file.model';
import { OrderFileService } from './order-file.service';
import { OrderFileComponent } from './order-file.component';
import { OrderFileDetailComponent } from './order-file-detail.component';
import { OrderFileUpdateComponent } from './order-file-update.component';
import { OrderFileDeletePopupComponent } from './order-file-delete-dialog.component';
import { IOrderFile } from 'app/shared/model/order-file.model';

@Injectable({ providedIn: 'root' })
export class OrderFileResolve implements Resolve<IOrderFile> {
    constructor(private service: OrderFileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderFile: HttpResponse<OrderFile>) => orderFile.body));
        }
        return of(new OrderFile());
    }
}

export const orderFileRoute: Routes = [
    {
        path: 'order-file',
        component: OrderFileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderFile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-file/:id/view',
        component: OrderFileDetailComponent,
        resolve: {
            orderFile: OrderFileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderFile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-file/new',
        component: OrderFileUpdateComponent,
        resolve: {
            orderFile: OrderFileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderFile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-file/:id/edit',
        component: OrderFileUpdateComponent,
        resolve: {
            orderFile: OrderFileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderFile.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderFilePopupRoute: Routes = [
    {
        path: 'order-file/:id/delete',
        component: OrderFileDeletePopupComponent,
        resolve: {
            orderFile: OrderFileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.orderFile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
