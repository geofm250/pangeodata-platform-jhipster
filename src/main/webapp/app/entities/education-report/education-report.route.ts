import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EducationReport } from 'app/shared/model/education-report.model';
import { EducationReportService } from './education-report.service';
import { EducationReportComponent } from './education-report.component';
import { EducationReportDetailComponent } from './education-report-detail.component';
import { EducationReportUpdateComponent } from './education-report-update.component';
import { EducationReportDeletePopupComponent } from './education-report-delete-dialog.component';
import { IEducationReport } from 'app/shared/model/education-report.model';

@Injectable({ providedIn: 'root' })
export class EducationReportResolve implements Resolve<IEducationReport> {
    constructor(private service: EducationReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((educationReport: HttpResponse<EducationReport>) => educationReport.body));
        }
        return of(new EducationReport());
    }
}

export const educationReportRoute: Routes = [
    {
        path: 'education-report',
        component: EducationReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.educationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-report/:id/view',
        component: EducationReportDetailComponent,
        resolve: {
            educationReport: EducationReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.educationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-report/new',
        component: EducationReportUpdateComponent,
        resolve: {
            educationReport: EducationReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.educationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'education-report/:id/edit',
        component: EducationReportUpdateComponent,
        resolve: {
            educationReport: EducationReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.educationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const educationReportPopupRoute: Routes = [
    {
        path: 'education-report/:id/delete',
        component: EducationReportDeletePopupComponent,
        resolve: {
            educationReport: EducationReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.educationReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
