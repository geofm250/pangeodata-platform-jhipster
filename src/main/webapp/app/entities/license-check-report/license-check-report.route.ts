import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LicenseCheckReport } from 'app/shared/model/license-check-report.model';
import { LicenseCheckReportService } from './license-check-report.service';
import { LicenseCheckReportComponent } from './license-check-report.component';
import { LicenseCheckReportDetailComponent } from './license-check-report-detail.component';
import { LicenseCheckReportUpdateComponent } from './license-check-report-update.component';
import { LicenseCheckReportDeletePopupComponent } from './license-check-report-delete-dialog.component';
import { ILicenseCheckReport } from 'app/shared/model/license-check-report.model';

@Injectable({ providedIn: 'root' })
export class LicenseCheckReportResolve implements Resolve<ILicenseCheckReport> {
    constructor(private service: LicenseCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((licenseCheckReport: HttpResponse<LicenseCheckReport>) => licenseCheckReport.body));
        }
        return of(new LicenseCheckReport());
    }
}

export const licenseCheckReportRoute: Routes = [
    {
        path: 'license-check-report',
        component: LicenseCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.licenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'license-check-report/:id/view',
        component: LicenseCheckReportDetailComponent,
        resolve: {
            licenseCheckReport: LicenseCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.licenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'license-check-report/new',
        component: LicenseCheckReportUpdateComponent,
        resolve: {
            licenseCheckReport: LicenseCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.licenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'license-check-report/:id/edit',
        component: LicenseCheckReportUpdateComponent,
        resolve: {
            licenseCheckReport: LicenseCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.licenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const licenseCheckReportPopupRoute: Routes = [
    {
        path: 'license-check-report/:id/delete',
        component: LicenseCheckReportDeletePopupComponent,
        resolve: {
            licenseCheckReport: LicenseCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.licenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
