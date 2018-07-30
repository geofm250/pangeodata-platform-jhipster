import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';
import { SocialMediaCheckReportService } from './social-media-check-report.service';
import { SocialMediaCheckReportComponent } from './social-media-check-report.component';
import { SocialMediaCheckReportDetailComponent } from './social-media-check-report-detail.component';
import { SocialMediaCheckReportUpdateComponent } from './social-media-check-report-update.component';
import { SocialMediaCheckReportDeletePopupComponent } from './social-media-check-report-delete-dialog.component';
import { ISocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';

@Injectable({ providedIn: 'root' })
export class SocialMediaCheckReportResolve implements Resolve<ISocialMediaCheckReport> {
    constructor(private service: SocialMediaCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((socialMediaCheckReport: HttpResponse<SocialMediaCheckReport>) => socialMediaCheckReport.body));
        }
        return of(new SocialMediaCheckReport());
    }
}

export const socialMediaCheckReportRoute: Routes = [
    {
        path: 'social-media-check-report',
        component: SocialMediaCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.socialMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'social-media-check-report/:id/view',
        component: SocialMediaCheckReportDetailComponent,
        resolve: {
            socialMediaCheckReport: SocialMediaCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.socialMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'social-media-check-report/new',
        component: SocialMediaCheckReportUpdateComponent,
        resolve: {
            socialMediaCheckReport: SocialMediaCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.socialMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'social-media-check-report/:id/edit',
        component: SocialMediaCheckReportUpdateComponent,
        resolve: {
            socialMediaCheckReport: SocialMediaCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.socialMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const socialMediaCheckReportPopupRoute: Routes = [
    {
        path: 'social-media-check-report/:id/delete',
        component: SocialMediaCheckReportDeletePopupComponent,
        resolve: {
            socialMediaCheckReport: SocialMediaCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.socialMediaCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
