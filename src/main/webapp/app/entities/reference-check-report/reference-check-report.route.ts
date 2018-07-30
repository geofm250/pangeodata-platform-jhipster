import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReferenceCheckReport } from 'app/shared/model/reference-check-report.model';
import { ReferenceCheckReportService } from './reference-check-report.service';
import { ReferenceCheckReportComponent } from './reference-check-report.component';
import { ReferenceCheckReportDetailComponent } from './reference-check-report-detail.component';
import { ReferenceCheckReportUpdateComponent } from './reference-check-report-update.component';
import { ReferenceCheckReportDeletePopupComponent } from './reference-check-report-delete-dialog.component';
import { IReferenceCheckReport } from 'app/shared/model/reference-check-report.model';

@Injectable({ providedIn: 'root' })
export class ReferenceCheckReportResolve implements Resolve<IReferenceCheckReport> {
    constructor(private service: ReferenceCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((referenceCheckReport: HttpResponse<ReferenceCheckReport>) => referenceCheckReport.body));
        }
        return of(new ReferenceCheckReport());
    }
}

export const referenceCheckReportRoute: Routes = [
    {
        path: 'reference-check-report',
        component: ReferenceCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.referenceCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reference-check-report/:id/view',
        component: ReferenceCheckReportDetailComponent,
        resolve: {
            referenceCheckReport: ReferenceCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.referenceCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reference-check-report/new',
        component: ReferenceCheckReportUpdateComponent,
        resolve: {
            referenceCheckReport: ReferenceCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.referenceCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reference-check-report/:id/edit',
        component: ReferenceCheckReportUpdateComponent,
        resolve: {
            referenceCheckReport: ReferenceCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.referenceCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const referenceCheckReportPopupRoute: Routes = [
    {
        path: 'reference-check-report/:id/delete',
        component: ReferenceCheckReportDeletePopupComponent,
        resolve: {
            referenceCheckReport: ReferenceCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.referenceCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
