import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from 'app/shared/model/token.model';
import { TokenService } from './token.service';
import { TokenComponent } from './token.component';
import { TokenDetailComponent } from './token-detail.component';
import { TokenUpdateComponent } from './token-update.component';
import { TokenDeletePopupComponent } from './token-delete-dialog.component';
import { IToken } from 'app/shared/model/token.model';

@Injectable({ providedIn: 'root' })
export class TokenResolve implements Resolve<IToken> {
    constructor(private service: TokenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((token: HttpResponse<Token>) => token.body));
        }
        return of(new Token());
    }
}

export const tokenRoute: Routes = [
    {
        path: 'token',
        component: TokenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.token.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'token/:id/view',
        component: TokenDetailComponent,
        resolve: {
            token: TokenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.token.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'token/new',
        component: TokenUpdateComponent,
        resolve: {
            token: TokenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.token.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'token/:id/edit',
        component: TokenUpdateComponent,
        resolve: {
            token: TokenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.token.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tokenPopupRoute: Routes = [
    {
        path: 'token/:id/delete',
        component: TokenDeletePopupComponent,
        resolve: {
            token: TokenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.token.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
