import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Link } from 'app/shared/model/link.model';
import { LinkService } from './link.service';
import { LinkComponent } from './link.component';
import { LinkDetailComponent } from './link-detail.component';
import { LinkUpdateComponent } from './link-update.component';
import { LinkDeletePopupComponent } from './link-delete-dialog.component';
import { ILink } from 'app/shared/model/link.model';

@Injectable({ providedIn: 'root' })
export class LinkResolve implements Resolve<ILink> {
    constructor(private service: LinkService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((link: HttpResponse<Link>) => link.body));
        }
        return of(new Link());
    }
}

export const linkRoute: Routes = [
    {
        path: 'link',
        component: LinkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.link.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'link/:id/view',
        component: LinkDetailComponent,
        resolve: {
            link: LinkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.link.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'link/new',
        component: LinkUpdateComponent,
        resolve: {
            link: LinkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.link.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'link/:id/edit',
        component: LinkUpdateComponent,
        resolve: {
            link: LinkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.link.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const linkPopupRoute: Routes = [
    {
        path: 'link/:id/delete',
        component: LinkDeletePopupComponent,
        resolve: {
            link: LinkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.link.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
