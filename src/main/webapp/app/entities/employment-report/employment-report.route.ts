import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmploymentReport } from 'app/shared/model/employment-report.model';
import { EmploymentReportService } from './employment-report.service';
import { EmploymentReportComponent } from './employment-report.component';
import { EmploymentReportDetailComponent } from './employment-report-detail.component';
import { EmploymentReportUpdateComponent } from './employment-report-update.component';
import { EmploymentReportDeletePopupComponent } from './employment-report-delete-dialog.component';
import { IEmploymentReport } from 'app/shared/model/employment-report.model';

@Injectable({ providedIn: 'root' })
export class EmploymentReportResolve implements Resolve<IEmploymentReport> {
    constructor(private service: EmploymentReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((employmentReport: HttpResponse<EmploymentReport>) => employmentReport.body));
        }
        return of(new EmploymentReport());
    }
}

export const employmentReportRoute: Routes = [
    {
        path: 'employment-report',
        component: EmploymentReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.employmentReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employment-report/:id/view',
        component: EmploymentReportDetailComponent,
        resolve: {
            employmentReport: EmploymentReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.employmentReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employment-report/new',
        component: EmploymentReportUpdateComponent,
        resolve: {
            employmentReport: EmploymentReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.employmentReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employment-report/:id/edit',
        component: EmploymentReportUpdateComponent,
        resolve: {
            employmentReport: EmploymentReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.employmentReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employmentReportPopupRoute: Routes = [
    {
        path: 'employment-report/:id/delete',
        component: EmploymentReportDeletePopupComponent,
        resolve: {
            employmentReport: EmploymentReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.employmentReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
