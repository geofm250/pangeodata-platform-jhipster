import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrderReport } from 'app/shared/model/i-order-report.model';
import { IOrderReportService } from './i-order-report.service';
import { IOrderReportComponent } from './i-order-report.component';
import { IOrderReportDetailComponent } from './i-order-report-detail.component';
import { IOrderReportUpdateComponent } from './i-order-report-update.component';
import { IOrderReportDeletePopupComponent } from './i-order-report-delete-dialog.component';
import { IIOrderReport } from 'app/shared/model/i-order-report.model';

@Injectable({ providedIn: 'root' })
export class IOrderReportResolve implements Resolve<IIOrderReport> {
    constructor(private service: IOrderReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((iOrderReport: HttpResponse<IOrderReport>) => iOrderReport.body));
        }
        return of(new IOrderReport());
    }
}

export const iOrderReportRoute: Routes = [
    {
        path: 'i-order-report',
        component: IOrderReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-order-report/:id/view',
        component: IOrderReportDetailComponent,
        resolve: {
            iOrderReport: IOrderReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-order-report/new',
        component: IOrderReportUpdateComponent,
        resolve: {
            iOrderReport: IOrderReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-order-report/:id/edit',
        component: IOrderReportUpdateComponent,
        resolve: {
            iOrderReport: IOrderReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iOrderReportPopupRoute: Routes = [
    {
        path: 'i-order-report/:id/delete',
        component: IOrderReportDeletePopupComponent,
        resolve: {
            iOrderReport: IOrderReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iOrderReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
