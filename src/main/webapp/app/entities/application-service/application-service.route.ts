import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationService } from 'app/shared/model/application-service.model';
import { ApplicationServiceService } from './application-service.service';
import { ApplicationServiceComponent } from './application-service.component';
import { ApplicationServiceDetailComponent } from './application-service-detail.component';
import { ApplicationServiceUpdateComponent } from './application-service-update.component';
import { ApplicationServiceDeletePopupComponent } from './application-service-delete-dialog.component';
import { IApplicationService } from 'app/shared/model/application-service.model';

@Injectable({ providedIn: 'root' })
export class ApplicationServiceResolve implements Resolve<IApplicationService> {
    constructor(private service: ApplicationServiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((applicationService: HttpResponse<ApplicationService>) => applicationService.body));
        }
        return of(new ApplicationService());
    }
}

export const applicationServiceRoute: Routes = [
    {
        path: 'application-service',
        component: ApplicationServiceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.applicationService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-service/:id/view',
        component: ApplicationServiceDetailComponent,
        resolve: {
            applicationService: ApplicationServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.applicationService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-service/new',
        component: ApplicationServiceUpdateComponent,
        resolve: {
            applicationService: ApplicationServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.applicationService.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-service/:id/edit',
        component: ApplicationServiceUpdateComponent,
        resolve: {
            applicationService: ApplicationServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.applicationService.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicationServicePopupRoute: Routes = [
    {
        path: 'application-service/:id/delete',
        component: ApplicationServiceDeletePopupComponent,
        resolve: {
            applicationService: ApplicationServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.applicationService.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
