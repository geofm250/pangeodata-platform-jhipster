import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRequirement } from 'app/shared/model/requirement.model';
import { Principal } from 'app/core';
import { RequirementService } from './requirement.service';

@Component({
    selector: 'jhi-requirement',
    templateUrl: './requirement.component.html'
})
export class RequirementComponent implements OnInit, OnDestroy {
    requirements: IRequirement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private requirementService: RequirementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.requirementService.query().subscribe(
            (res: HttpResponse<IRequirement[]>) => {
                this.requirements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRequirements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRequirement) {
        return item.id;
    }

    registerChangeInRequirements() {
        this.eventSubscriber = this.eventManager.subscribe('requirementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
