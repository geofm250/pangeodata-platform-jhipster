import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCheckReport } from 'app/shared/model/credit-check-report.model';
import { CreditCheckReportService } from './credit-check-report.service';
import { CreditCheckReportComponent } from './credit-check-report.component';
import { CreditCheckReportDetailComponent } from './credit-check-report-detail.component';
import { CreditCheckReportUpdateComponent } from './credit-check-report-update.component';
import { CreditCheckReportDeletePopupComponent } from './credit-check-report-delete-dialog.component';
import { ICreditCheckReport } from 'app/shared/model/credit-check-report.model';

@Injectable({ providedIn: 'root' })
export class CreditCheckReportResolve implements Resolve<ICreditCheckReport> {
    constructor(private service: CreditCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((creditCheckReport: HttpResponse<CreditCheckReport>) => creditCheckReport.body));
        }
        return of(new CreditCheckReport());
    }
}

export const creditCheckReportRoute: Routes = [
    {
        path: 'credit-check-report',
        component: CreditCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.creditCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'credit-check-report/:id/view',
        component: CreditCheckReportDetailComponent,
        resolve: {
            creditCheckReport: CreditCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.creditCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'credit-check-report/new',
        component: CreditCheckReportUpdateComponent,
        resolve: {
            creditCheckReport: CreditCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.creditCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'credit-check-report/:id/edit',
        component: CreditCheckReportUpdateComponent,
        resolve: {
            creditCheckReport: CreditCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.creditCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const creditCheckReportPopupRoute: Routes = [
    {
        path: 'credit-check-report/:id/delete',
        component: CreditCheckReportDeletePopupComponent,
        resolve: {
            creditCheckReport: CreditCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.creditCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
