import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralInformation } from 'app/shared/model/general-information.model';
import { GeneralInformationService } from './general-information.service';
import { GeneralInformationComponent } from './general-information.component';
import { GeneralInformationDetailComponent } from './general-information-detail.component';
import { GeneralInformationUpdateComponent } from './general-information-update.component';
import { GeneralInformationDeletePopupComponent } from './general-information-delete-dialog.component';
import { IGeneralInformation } from 'app/shared/model/general-information.model';

@Injectable({ providedIn: 'root' })
export class GeneralInformationResolve implements Resolve<IGeneralInformation> {
    constructor(private service: GeneralInformationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((generalInformation: HttpResponse<GeneralInformation>) => generalInformation.body));
        }
        return of(new GeneralInformation());
    }
}

export const generalInformationRoute: Routes = [
    {
        path: 'general-information',
        component: GeneralInformationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.generalInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'general-information/:id/view',
        component: GeneralInformationDetailComponent,
        resolve: {
            generalInformation: GeneralInformationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.generalInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'general-information/new',
        component: GeneralInformationUpdateComponent,
        resolve: {
            generalInformation: GeneralInformationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.generalInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'general-information/:id/edit',
        component: GeneralInformationUpdateComponent,
        resolve: {
            generalInformation: GeneralInformationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.generalInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const generalInformationPopupRoute: Routes = [
    {
        path: 'general-information/:id/delete',
        component: GeneralInformationDeletePopupComponent,
        resolve: {
            generalInformation: GeneralInformationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.generalInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
