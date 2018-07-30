import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';
import { PoliticallyExposedPersonsCheckReportService } from './politically-exposed-persons-check-report.service';
import { PoliticallyExposedPersonsCheckReportComponent } from './politically-exposed-persons-check-report.component';
import { PoliticallyExposedPersonsCheckReportDetailComponent } from './politically-exposed-persons-check-report-detail.component';
import { PoliticallyExposedPersonsCheckReportUpdateComponent } from './politically-exposed-persons-check-report-update.component';
import { PoliticallyExposedPersonsCheckReportDeletePopupComponent } from './politically-exposed-persons-check-report-delete-dialog.component';
import { IPoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';

@Injectable({ providedIn: 'root' })
export class PoliticallyExposedPersonsCheckReportResolve implements Resolve<IPoliticallyExposedPersonsCheckReport> {
    constructor(private service: PoliticallyExposedPersonsCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map(
                        (politicallyExposedPersonsCheckReport: HttpResponse<PoliticallyExposedPersonsCheckReport>) =>
                            politicallyExposedPersonsCheckReport.body
                    )
                );
        }
        return of(new PoliticallyExposedPersonsCheckReport());
    }
}

export const politicallyExposedPersonsCheckReportRoute: Routes = [
    {
        path: 'politically-exposed-persons-check-report',
        component: PoliticallyExposedPersonsCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.politicallyExposedPersonsCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'politically-exposed-persons-check-report/:id/view',
        component: PoliticallyExposedPersonsCheckReportDetailComponent,
        resolve: {
            politicallyExposedPersonsCheckReport: PoliticallyExposedPersonsCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.politicallyExposedPersonsCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'politically-exposed-persons-check-report/new',
        component: PoliticallyExposedPersonsCheckReportUpdateComponent,
        resolve: {
            politicallyExposedPersonsCheckReport: PoliticallyExposedPersonsCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.politicallyExposedPersonsCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'politically-exposed-persons-check-report/:id/edit',
        component: PoliticallyExposedPersonsCheckReportUpdateComponent,
        resolve: {
            politicallyExposedPersonsCheckReport: PoliticallyExposedPersonsCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.politicallyExposedPersonsCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const politicallyExposedPersonsCheckReportPopupRoute: Routes = [
    {
        path: 'politically-exposed-persons-check-report/:id/delete',
        component: PoliticallyExposedPersonsCheckReportDeletePopupComponent,
        resolve: {
            politicallyExposedPersonsCheckReport: PoliticallyExposedPersonsCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.politicallyExposedPersonsCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
