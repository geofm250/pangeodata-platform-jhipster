import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IApplicationService } from 'app/shared/model/application-service.model';
import { Principal } from 'app/core';
import { ApplicationServiceService } from './application-service.service';

@Component({
    selector: 'jhi-application-service',
    templateUrl: './application-service.component.html'
})
export class ApplicationServiceComponent implements OnInit, OnDestroy {
    applicationServices: IApplicationService[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private applicationServiceService: ApplicationServiceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.applicationServiceService.query().subscribe(
            (res: HttpResponse<IApplicationService[]>) => {
                this.applicationServices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInApplicationServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IApplicationService) {
        return item.id;
    }

    registerChangeInApplicationServices() {
        this.eventSubscriber = this.eventManager.subscribe('applicationServiceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
