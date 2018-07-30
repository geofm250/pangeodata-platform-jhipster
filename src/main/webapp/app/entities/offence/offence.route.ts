import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offence } from 'app/shared/model/offence.model';
import { OffenceService } from './offence.service';
import { OffenceComponent } from './offence.component';
import { OffenceDetailComponent } from './offence-detail.component';
import { OffenceUpdateComponent } from './offence-update.component';
import { OffenceDeletePopupComponent } from './offence-delete-dialog.component';
import { IOffence } from 'app/shared/model/offence.model';

@Injectable({ providedIn: 'root' })
export class OffenceResolve implements Resolve<IOffence> {
    constructor(private service: OffenceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((offence: HttpResponse<Offence>) => offence.body));
        }
        return of(new Offence());
    }
}

export const offenceRoute: Routes = [
    {
        path: 'offence',
        component: OffenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.offence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offence/:id/view',
        component: OffenceDetailComponent,
        resolve: {
            offence: OffenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.offence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offence/new',
        component: OffenceUpdateComponent,
        resolve: {
            offence: OffenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.offence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offence/:id/edit',
        component: OffenceUpdateComponent,
        resolve: {
            offence: OffenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.offence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offencePopupRoute: Routes = [
    {
        path: 'offence/:id/delete',
        component: OffenceDeletePopupComponent,
        resolve: {
            offence: OffenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.offence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
