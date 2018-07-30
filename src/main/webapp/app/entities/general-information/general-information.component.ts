import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGeneralInformation } from 'app/shared/model/general-information.model';
import { Principal } from 'app/core';
import { GeneralInformationService } from './general-information.service';

@Component({
    selector: 'jhi-general-information',
    templateUrl: './general-information.component.html'
})
export class GeneralInformationComponent implements OnInit, OnDestroy {
    generalInformations: IGeneralInformation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private generalInformationService: GeneralInformationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.generalInformationService.query().subscribe(
            (res: HttpResponse<IGeneralInformation[]>) => {
                this.generalInformations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGeneralInformations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGeneralInformation) {
        return item.id;
    }

    registerChangeInGeneralInformations() {
        this.eventSubscriber = this.eventManager.subscribe('generalInformationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
