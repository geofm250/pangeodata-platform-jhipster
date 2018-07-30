import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOffence } from 'app/shared/model/offence.model';
import { Principal } from 'app/core';
import { OffenceService } from './offence.service';

@Component({
    selector: 'jhi-offence',
    templateUrl: './offence.component.html'
})
export class OffenceComponent implements OnInit, OnDestroy {
    offences: IOffence[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private offenceService: OffenceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.offenceService.query().subscribe(
            (res: HttpResponse<IOffence[]>) => {
                this.offences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOffences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOffence) {
        return item.id;
    }

    registerChangeInOffences() {
        this.eventSubscriber = this.eventManager.subscribe('offenceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
