import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';
import { LocalLanguageMediaCheckReportService } from './local-language-media-check-report.service';
import { LocalLanguageMediaCheckReportComponent } from './local-language-media-check-report.component';
import { LocalLanguageMediaCheckReportDetailComponent } from './local-language-media-check-report-detail.component';
import { LocalLanguageMediaCheckReportUpdateComponent } from './local-language-media-check-report-update.component';
import { LocalLanguageMediaCheckReportDeletePopupComponent } from './local-language-media-check-report-delete-dialog.component';
import { ILocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';

@Injectable({ providedIn: 'root' })
export class LocalLanguageMediaCheckReportResolve implements Resolve<ILocalLanguageMediaCheckReport> {
    constructor(private service: LocalLanguageMediaCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map((localLanguageMediaCheckReport: HttpResponse<LocalLanguageMediaCheckReport>) => localLanguageMediaCheckReport.body)
                );
        }
        return of(new LocalLanguageMediaCheckReport());
    }
}

export const localLanguageMediaCheckReportRoute: Routes = [
    {
        path: 'local-language-media-check-report',
        component: LocalLanguageMediaCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.localLanguageMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'local-language-media-check-report/:id/view',
        component: LocalLanguageMediaCheckReportDetailComponent,
        resolve: {
            localLanguageMediaCheckReport: LocalLanguageMediaCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.localLanguageMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'local-language-media-check-report/new',
        component: LocalLanguageMediaCheckReportUpdateComponent,
        resolve: {
            localLanguageMediaCheckReport: LocalLanguageMediaCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.localLanguageMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'local-language-media-check-report/:id/edit',
        component: LocalLanguageMediaCheckReportUpdateComponent,
        resolve: {
            localLanguageMediaCheckReport: LocalLanguageMediaCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.localLanguageMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const localLanguageMediaCheckReportPopupRoute: Routes = [
    {
        path: 'local-language-media-check-report/:id/delete',
        component: LocalLanguageMediaCheckReportDeletePopupComponent,
        resolve: {
            localLanguageMediaCheckReport: LocalLanguageMediaCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.localLanguageMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
