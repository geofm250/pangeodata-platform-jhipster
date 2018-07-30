import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultReport } from 'app/shared/model/default-report.model';
import { DefaultReportService } from './default-report.service';
import { DefaultReportComponent } from './default-report.component';
import { DefaultReportDetailComponent } from './default-report-detail.component';
import { DefaultReportUpdateComponent } from './default-report-update.component';
import { DefaultReportDeletePopupComponent } from './default-report-delete-dialog.component';
import { IDefaultReport } from 'app/shared/model/default-report.model';

@Injectable({ providedIn: 'root' })
export class DefaultReportResolve implements Resolve<IDefaultReport> {
    constructor(private service: DefaultReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((defaultReport: HttpResponse<DefaultReport>) => defaultReport.body));
        }
        return of(new DefaultReport());
    }
}

export const defaultReportRoute: Routes = [
    {
        path: 'default-report',
        component: DefaultReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.defaultReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'default-report/:id/view',
        component: DefaultReportDetailComponent,
        resolve: {
            defaultReport: DefaultReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.defaultReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'default-report/new',
        component: DefaultReportUpdateComponent,
        resolve: {
            defaultReport: DefaultReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.defaultReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'default-report/:id/edit',
        component: DefaultReportUpdateComponent,
        resolve: {
            defaultReport: DefaultReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.defaultReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defaultReportPopupRoute: Routes = [
    {
        path: 'default-report/:id/delete',
        component: DefaultReportDeletePopupComponent,
        resolve: {
            defaultReport: DefaultReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.defaultReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
