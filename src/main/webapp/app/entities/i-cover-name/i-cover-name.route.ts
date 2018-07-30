import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICoverName } from 'app/shared/model/i-cover-name.model';
import { ICoverNameService } from './i-cover-name.service';
import { ICoverNameComponent } from './i-cover-name.component';
import { ICoverNameDetailComponent } from './i-cover-name-detail.component';
import { ICoverNameUpdateComponent } from './i-cover-name-update.component';
import { ICoverNameDeletePopupComponent } from './i-cover-name-delete-dialog.component';
import { IICoverName } from 'app/shared/model/i-cover-name.model';

@Injectable({ providedIn: 'root' })
export class ICoverNameResolve implements Resolve<IICoverName> {
    constructor(private service: ICoverNameService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((iCoverName: HttpResponse<ICoverName>) => iCoverName.body));
        }
        return of(new ICoverName());
    }
}

export const iCoverNameRoute: Routes = [
    {
        path: 'i-cover-name',
        component: ICoverNameComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iCoverName.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-cover-name/:id/view',
        component: ICoverNameDetailComponent,
        resolve: {
            iCoverName: ICoverNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iCoverName.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-cover-name/new',
        component: ICoverNameUpdateComponent,
        resolve: {
            iCoverName: ICoverNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iCoverName.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'i-cover-name/:id/edit',
        component: ICoverNameUpdateComponent,
        resolve: {
            iCoverName: ICoverNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iCoverName.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iCoverNamePopupRoute: Routes = [
    {
        path: 'i-cover-name/:id/delete',
        component: ICoverNameDeletePopupComponent,
        resolve: {
            iCoverName: ICoverNameResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.iCoverName.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
