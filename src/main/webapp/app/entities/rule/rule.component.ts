import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRule } from 'app/shared/model/rule.model';
import { Principal } from 'app/core';
import { RuleService } from './rule.service';

@Component({
    selector: 'jhi-rule',
    templateUrl: './rule.component.html'
})
export class RuleComponent implements OnInit, OnDestroy {
    rules: IRule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ruleService: RuleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.ruleService.query().subscribe(
            (res: HttpResponse<IRule[]>) => {
                this.rules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRule) {
        return item.id;
    }

    registerChangeInRules() {
        this.eventSubscriber = this.eventManager.subscribe('ruleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
