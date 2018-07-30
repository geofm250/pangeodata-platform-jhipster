import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityCheckReport } from 'app/shared/model/identity-check-report.model';
import { IdentityCheckReportService } from './identity-check-report.service';
import { IdentityCheckReportComponent } from './identity-check-report.component';
import { IdentityCheckReportDetailComponent } from './identity-check-report-detail.component';
import { IdentityCheckReportUpdateComponent } from './identity-check-report-update.component';
import { IdentityCheckReportDeletePopupComponent } from './identity-check-report-delete-dialog.component';
import { IIdentityCheckReport } from 'app/shared/model/identity-check-report.model';

@Injectable({ providedIn: 'root' })
export class IdentityCheckReportResolve implements Resolve<IIdentityCheckReport> {
    constructor(private service: IdentityCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((identityCheckReport: HttpResponse<IdentityCheckReport>) => identityCheckReport.body));
        }
        return of(new IdentityCheckReport());
    }
}

export const identityCheckReportRoute: Routes = [
    {
        path: 'identity-check-report',
        component: IdentityCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.identityCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'identity-check-report/:id/view',
        component: IdentityCheckReportDetailComponent,
        resolve: {
            identityCheckReport: IdentityCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.identityCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'identity-check-report/new',
        component: IdentityCheckReportUpdateComponent,
        resolve: {
            identityCheckReport: IdentityCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.identityCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'identity-check-report/:id/edit',
        component: IdentityCheckReportUpdateComponent,
        resolve: {
            identityCheckReport: IdentityCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.identityCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const identityCheckReportPopupRoute: Routes = [
    {
        path: 'identity-check-report/:id/delete',
        component: IdentityCheckReportDeletePopupComponent,
        resolve: {
            identityCheckReport: IdentityCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.identityCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
