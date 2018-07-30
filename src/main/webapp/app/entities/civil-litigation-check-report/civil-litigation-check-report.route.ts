import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';
import { CivilLitigationCheckReportService } from './civil-litigation-check-report.service';
import { CivilLitigationCheckReportComponent } from './civil-litigation-check-report.component';
import { CivilLitigationCheckReportDetailComponent } from './civil-litigation-check-report-detail.component';
import { CivilLitigationCheckReportUpdateComponent } from './civil-litigation-check-report-update.component';
import { CivilLitigationCheckReportDeletePopupComponent } from './civil-litigation-check-report-delete-dialog.component';
import { ICivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';

@Injectable({ providedIn: 'root' })
export class CivilLitigationCheckReportResolve implements Resolve<ICivilLitigationCheckReport> {
    constructor(private service: CivilLitigationCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((civilLitigationCheckReport: HttpResponse<CivilLitigationCheckReport>) => civilLitigationCheckReport.body));
        }
        return of(new CivilLitigationCheckReport());
    }
}

export const civilLitigationCheckReportRoute: Routes = [
    {
        path: 'civil-litigation-check-report',
        component: CivilLitigationCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.civilLitigationCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'civil-litigation-check-report/:id/view',
        component: CivilLitigationCheckReportDetailComponent,
        resolve: {
            civilLitigationCheckReport: CivilLitigationCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.civilLitigationCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'civil-litigation-check-report/new',
        component: CivilLitigationCheckReportUpdateComponent,
        resolve: {
            civilLitigationCheckReport: CivilLitigationCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.civilLitigationCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'civil-litigation-check-report/:id/edit',
        component: CivilLitigationCheckReportUpdateComponent,
        resolve: {
            civilLitigationCheckReport: CivilLitigationCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.civilLitigationCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const civilLitigationCheckReportPopupRoute: Routes = [
    {
        path: 'civil-litigation-check-report/:id/delete',
        component: CivilLitigationCheckReportDeletePopupComponent,
        resolve: {
            civilLitigationCheckReport: CivilLitigationCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.civilLitigationCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
