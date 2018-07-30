import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomUser } from 'app/shared/model/custom-user.model';
import { CustomUserService } from './custom-user.service';
import { CustomUserComponent } from './custom-user.component';
import { CustomUserDetailComponent } from './custom-user-detail.component';
import { CustomUserUpdateComponent } from './custom-user-update.component';
import { CustomUserDeletePopupComponent } from './custom-user-delete-dialog.component';
import { ICustomUser } from 'app/shared/model/custom-user.model';

@Injectable({ providedIn: 'root' })
export class CustomUserResolve implements Resolve<ICustomUser> {
    constructor(private service: CustomUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customUser: HttpResponse<CustomUser>) => customUser.body));
        }
        return of(new CustomUser());
    }
}

export const customUserRoute: Routes = [
    {
        path: 'custom-user',
        component: CustomUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.customUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'custom-user/:id/view',
        component: CustomUserDetailComponent,
        resolve: {
            customUser: CustomUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.customUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'custom-user/new',
        component: CustomUserUpdateComponent,
        resolve: {
            customUser: CustomUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.customUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'custom-user/:id/edit',
        component: CustomUserUpdateComponent,
        resolve: {
            customUser: CustomUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.customUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customUserPopupRoute: Routes = [
    {
        path: 'custom-user/:id/delete',
        component: CustomUserDeletePopupComponent,
        resolve: {
            customUser: CustomUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.customUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
