import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Requirement } from 'app/shared/model/requirement.model';
import { RequirementService } from './requirement.service';
import { RequirementComponent } from './requirement.component';
import { RequirementDetailComponent } from './requirement-detail.component';
import { RequirementUpdateComponent } from './requirement-update.component';
import { RequirementDeletePopupComponent } from './requirement-delete-dialog.component';
import { IRequirement } from 'app/shared/model/requirement.model';

@Injectable({ providedIn: 'root' })
export class RequirementResolve implements Resolve<IRequirement> {
    constructor(private service: RequirementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((requirement: HttpResponse<Requirement>) => requirement.body));
        }
        return of(new Requirement());
    }
}

export const requirementRoute: Routes = [
    {
        path: 'requirement',
        component: RequirementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.requirement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'requirement/:id/view',
        component: RequirementDetailComponent,
        resolve: {
            requirement: RequirementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.requirement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'requirement/new',
        component: RequirementUpdateComponent,
        resolve: {
            requirement: RequirementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.requirement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'requirement/:id/edit',
        component: RequirementUpdateComponent,
        resolve: {
            requirement: RequirementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.requirement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requirementPopupRoute: Routes = [
    {
        path: 'requirement/:id/delete',
        component: RequirementDeletePopupComponent,
        resolve: {
            requirement: RequirementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.requirement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
