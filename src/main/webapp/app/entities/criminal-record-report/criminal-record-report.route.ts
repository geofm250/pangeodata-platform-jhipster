import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CriminalRecordReport } from 'app/shared/model/criminal-record-report.model';
import { CriminalRecordReportService } from './criminal-record-report.service';
import { CriminalRecordReportComponent } from './criminal-record-report.component';
import { CriminalRecordReportDetailComponent } from './criminal-record-report-detail.component';
import { CriminalRecordReportUpdateComponent } from './criminal-record-report-update.component';
import { CriminalRecordReportDeletePopupComponent } from './criminal-record-report-delete-dialog.component';
import { ICriminalRecordReport } from 'app/shared/model/criminal-record-report.model';

@Injectable({ providedIn: 'root' })
export class CriminalRecordReportResolve implements Resolve<ICriminalRecordReport> {
    constructor(private service: CriminalRecordReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((criminalRecordReport: HttpResponse<CriminalRecordReport>) => criminalRecordReport.body));
        }
        return of(new CriminalRecordReport());
    }
}

export const criminalRecordReportRoute: Routes = [
    {
        path: 'criminal-record-report',
        component: CriminalRecordReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.criminalRecordReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'criminal-record-report/:id/view',
        component: CriminalRecordReportDetailComponent,
        resolve: {
            criminalRecordReport: CriminalRecordReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.criminalRecordReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'criminal-record-report/new',
        component: CriminalRecordReportUpdateComponent,
        resolve: {
            criminalRecordReport: CriminalRecordReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.criminalRecordReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'criminal-record-report/:id/edit',
        component: CriminalRecordReportUpdateComponent,
        resolve: {
            criminalRecordReport: CriminalRecordReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.criminalRecordReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const criminalRecordReportPopupRoute: Routes = [
    {
        path: 'criminal-record-report/:id/delete',
        component: CriminalRecordReportDeletePopupComponent,
        resolve: {
            criminalRecordReport: CriminalRecordReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.criminalRecordReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
