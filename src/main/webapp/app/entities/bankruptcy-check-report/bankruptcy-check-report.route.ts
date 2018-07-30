import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';
import { BankruptcyCheckReportService } from './bankruptcy-check-report.service';
import { BankruptcyCheckReportComponent } from './bankruptcy-check-report.component';
import { BankruptcyCheckReportDetailComponent } from './bankruptcy-check-report-detail.component';
import { BankruptcyCheckReportUpdateComponent } from './bankruptcy-check-report-update.component';
import { BankruptcyCheckReportDeletePopupComponent } from './bankruptcy-check-report-delete-dialog.component';
import { IBankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';

@Injectable({ providedIn: 'root' })
export class BankruptcyCheckReportResolve implements Resolve<IBankruptcyCheckReport> {
    constructor(private service: BankruptcyCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((bankruptcyCheckReport: HttpResponse<BankruptcyCheckReport>) => bankruptcyCheckReport.body));
        }
        return of(new BankruptcyCheckReport());
    }
}

export const bankruptcyCheckReportRoute: Routes = [
    {
        path: 'bankruptcy-check-report',
        component: BankruptcyCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.bankruptcyCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bankruptcy-check-report/:id/view',
        component: BankruptcyCheckReportDetailComponent,
        resolve: {
            bankruptcyCheckReport: BankruptcyCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.bankruptcyCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bankruptcy-check-report/new',
        component: BankruptcyCheckReportUpdateComponent,
        resolve: {
            bankruptcyCheckReport: BankruptcyCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.bankruptcyCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bankruptcy-check-report/:id/edit',
        component: BankruptcyCheckReportUpdateComponent,
        resolve: {
            bankruptcyCheckReport: BankruptcyCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.bankruptcyCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankruptcyCheckReportPopupRoute: Routes = [
    {
        path: 'bankruptcy-check-report/:id/delete',
        component: BankruptcyCheckReportDeletePopupComponent,
        resolve: {
            bankruptcyCheckReport: BankruptcyCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.bankruptcyCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
