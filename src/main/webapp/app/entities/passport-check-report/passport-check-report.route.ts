import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PassportCheckReport } from 'app/shared/model/passport-check-report.model';
import { PassportCheckReportService } from './passport-check-report.service';
import { PassportCheckReportComponent } from './passport-check-report.component';
import { PassportCheckReportDetailComponent } from './passport-check-report-detail.component';
import { PassportCheckReportUpdateComponent } from './passport-check-report-update.component';
import { PassportCheckReportDeletePopupComponent } from './passport-check-report-delete-dialog.component';
import { IPassportCheckReport } from 'app/shared/model/passport-check-report.model';

@Injectable({ providedIn: 'root' })
export class PassportCheckReportResolve implements Resolve<IPassportCheckReport> {
    constructor(private service: PassportCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((passportCheckReport: HttpResponse<PassportCheckReport>) => passportCheckReport.body));
        }
        return of(new PassportCheckReport());
    }
}

export const passportCheckReportRoute: Routes = [
    {
        path: 'passport-check-report',
        component: PassportCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.passportCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'passport-check-report/:id/view',
        component: PassportCheckReportDetailComponent,
        resolve: {
            passportCheckReport: PassportCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.passportCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'passport-check-report/new',
        component: PassportCheckReportUpdateComponent,
        resolve: {
            passportCheckReport: PassportCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.passportCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'passport-check-report/:id/edit',
        component: PassportCheckReportUpdateComponent,
        resolve: {
            passportCheckReport: PassportCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.passportCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const passportCheckReportPopupRoute: Routes = [
    {
        path: 'passport-check-report/:id/delete',
        component: PassportCheckReportDeletePopupComponent,
        resolve: {
            passportCheckReport: PassportCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.passportCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
