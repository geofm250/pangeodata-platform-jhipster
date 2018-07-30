import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';
import { ReportedCriminalActivityCheckService } from './reported-criminal-activity-check.service';
import { ReportedCriminalActivityCheckComponent } from './reported-criminal-activity-check.component';
import { ReportedCriminalActivityCheckDetailComponent } from './reported-criminal-activity-check-detail.component';
import { ReportedCriminalActivityCheckUpdateComponent } from './reported-criminal-activity-check-update.component';
import { ReportedCriminalActivityCheckDeletePopupComponent } from './reported-criminal-activity-check-delete-dialog.component';
import { IReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';

@Injectable({ providedIn: 'root' })
export class ReportedCriminalActivityCheckResolve implements Resolve<IReportedCriminalActivityCheck> {
    constructor(private service: ReportedCriminalActivityCheckService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map((reportedCriminalActivityCheck: HttpResponse<ReportedCriminalActivityCheck>) => reportedCriminalActivityCheck.body)
                );
        }
        return of(new ReportedCriminalActivityCheck());
    }
}

export const reportedCriminalActivityCheckRoute: Routes = [
    {
        path: 'reported-criminal-activity-check',
        component: ReportedCriminalActivityCheckComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.reportedCriminalActivityCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reported-criminal-activity-check/:id/view',
        component: ReportedCriminalActivityCheckDetailComponent,
        resolve: {
            reportedCriminalActivityCheck: ReportedCriminalActivityCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.reportedCriminalActivityCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reported-criminal-activity-check/new',
        component: ReportedCriminalActivityCheckUpdateComponent,
        resolve: {
            reportedCriminalActivityCheck: ReportedCriminalActivityCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.reportedCriminalActivityCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reported-criminal-activity-check/:id/edit',
        component: ReportedCriminalActivityCheckUpdateComponent,
        resolve: {
            reportedCriminalActivityCheck: ReportedCriminalActivityCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.reportedCriminalActivityCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reportedCriminalActivityCheckPopupRoute: Routes = [
    {
        path: 'reported-criminal-activity-check/:id/delete',
        component: ReportedCriminalActivityCheckDeletePopupComponent,
        resolve: {
            reportedCriminalActivityCheck: ReportedCriminalActivityCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.reportedCriminalActivityCheck.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
