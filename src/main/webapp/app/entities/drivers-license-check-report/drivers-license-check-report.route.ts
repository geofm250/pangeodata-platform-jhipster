import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';
import { DriversLicenseCheckReportService } from './drivers-license-check-report.service';
import { DriversLicenseCheckReportComponent } from './drivers-license-check-report.component';
import { DriversLicenseCheckReportDetailComponent } from './drivers-license-check-report-detail.component';
import { DriversLicenseCheckReportUpdateComponent } from './drivers-license-check-report-update.component';
import { DriversLicenseCheckReportDeletePopupComponent } from './drivers-license-check-report-delete-dialog.component';
import { IDriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';

@Injectable({ providedIn: 'root' })
export class DriversLicenseCheckReportResolve implements Resolve<IDriversLicenseCheckReport> {
    constructor(private service: DriversLicenseCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((driversLicenseCheckReport: HttpResponse<DriversLicenseCheckReport>) => driversLicenseCheckReport.body));
        }
        return of(new DriversLicenseCheckReport());
    }
}

export const driversLicenseCheckReportRoute: Routes = [
    {
        path: 'drivers-license-check-report',
        component: DriversLicenseCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.driversLicenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'drivers-license-check-report/:id/view',
        component: DriversLicenseCheckReportDetailComponent,
        resolve: {
            driversLicenseCheckReport: DriversLicenseCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.driversLicenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'drivers-license-check-report/new',
        component: DriversLicenseCheckReportUpdateComponent,
        resolve: {
            driversLicenseCheckReport: DriversLicenseCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.driversLicenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'drivers-license-check-report/:id/edit',
        component: DriversLicenseCheckReportUpdateComponent,
        resolve: {
            driversLicenseCheckReport: DriversLicenseCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.driversLicenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const driversLicenseCheckReportPopupRoute: Routes = [
    {
        path: 'drivers-license-check-report/:id/delete',
        component: DriversLicenseCheckReportDeletePopupComponent,
        resolve: {
            driversLicenseCheckReport: DriversLicenseCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.driversLicenseCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
