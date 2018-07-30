import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIOrderForm } from 'app/shared/model/i-order-form.model';
import { Principal } from 'app/core';
import { IOrderFormService } from './i-order-form.service';

@Component({
    selector: 'jhi-i-order-form',
    templateUrl: './i-order-form.component.html'
})
export class IOrderFormComponent implements OnInit, OnDestroy {
    iOrderForms: IIOrderForm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private iOrderFormService: IOrderFormService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.iOrderFormService.query().subscribe(
            (res: HttpResponse<IIOrderForm[]>) => {
                this.iOrderForms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIOrderForms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIOrderForm) {
        return item.id;
    }

    registerChangeInIOrderForms() {
        this.eventSubscriber = this.eventManager.subscribe('iOrderFormListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
