import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rule } from 'app/shared/model/rule.model';
import { RuleService } from './rule.service';
import { RuleComponent } from './rule.component';
import { RuleDetailComponent } from './rule-detail.component';
import { RuleUpdateComponent } from './rule-update.component';
import { RuleDeletePopupComponent } from './rule-delete-dialog.component';
import { IRule } from 'app/shared/model/rule.model';

@Injectable({ providedIn: 'root' })
export class RuleResolve implements Resolve<IRule> {
    constructor(private service: RuleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((rule: HttpResponse<Rule>) => rule.body));
        }
        return of(new Rule());
    }
}

export const ruleRoute: Routes = [
    {
        path: 'rule',
        component: RuleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.rule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rule/:id/view',
        component: RuleDetailComponent,
        resolve: {
            rule: RuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.rule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rule/new',
        component: RuleUpdateComponent,
        resolve: {
            rule: RuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.rule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rule/:id/edit',
        component: RuleUpdateComponent,
        resolve: {
            rule: RuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.rule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rulePopupRoute: Routes = [
    {
        path: 'rule/:id/delete',
        component: RuleDeletePopupComponent,
        resolve: {
            rule: RuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.rule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
