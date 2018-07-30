import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';
import { DirectorshipVerificationReportService } from './directorship-verification-report.service';
import { DirectorshipVerificationReportComponent } from './directorship-verification-report.component';
import { DirectorshipVerificationReportDetailComponent } from './directorship-verification-report-detail.component';
import { DirectorshipVerificationReportUpdateComponent } from './directorship-verification-report-update.component';
import { DirectorshipVerificationReportDeletePopupComponent } from './directorship-verification-report-delete-dialog.component';
import { IDirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';

@Injectable({ providedIn: 'root' })
export class DirectorshipVerificationReportResolve implements Resolve<IDirectorshipVerificationReport> {
    constructor(private service: DirectorshipVerificationReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map(
                        (directorshipVerificationReport: HttpResponse<DirectorshipVerificationReport>) =>
                            directorshipVerificationReport.body
                    )
                );
        }
        return of(new DirectorshipVerificationReport());
    }
}

export const directorshipVerificationReportRoute: Routes = [
    {
        path: 'directorship-verification-report',
        component: DirectorshipVerificationReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.directorshipVerificationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'directorship-verification-report/:id/view',
        component: DirectorshipVerificationReportDetailComponent,
        resolve: {
            directorshipVerificationReport: DirectorshipVerificationReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.directorshipVerificationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'directorship-verification-report/new',
        component: DirectorshipVerificationReportUpdateComponent,
        resolve: {
            directorshipVerificationReport: DirectorshipVerificationReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.directorshipVerificationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'directorship-verification-report/:id/edit',
        component: DirectorshipVerificationReportUpdateComponent,
        resolve: {
            directorshipVerificationReport: DirectorshipVerificationReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.directorshipVerificationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const directorshipVerificationReportPopupRoute: Routes = [
    {
        path: 'directorship-verification-report/:id/delete',
        component: DirectorshipVerificationReportDeletePopupComponent,
        resolve: {
            directorshipVerificationReport: DirectorshipVerificationReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.directorshipVerificationReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
