import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderForm } from 'app/shared/model/order-form.model';
import { Principal } from 'app/core';
import { OrderFormService } from './order-form.service';

@Component({
    selector: 'jhi-order-form',
    templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit, OnDestroy {
    orderForms: IOrderForm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderFormService: OrderFormService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderFormService.query().subscribe(
            (res: HttpResponse<IOrderForm[]>) => {
                this.orderForms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderForms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderForm) {
        return item.id;
    }

    registerChangeInOrderForms() {
        this.eventSubscriber = this.eventManager.subscribe('orderFormListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
