import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderInput } from 'app/shared/model/order-input.model';
import { Principal } from 'app/core';
import { OrderInputService } from './order-input.service';

@Component({
    selector: 'jhi-order-input',
    templateUrl: './order-input.component.html'
})
export class OrderInputComponent implements OnInit, OnDestroy {
    orderInputs: IOrderInput[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderInputService: OrderInputService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderInputService.query().subscribe(
            (res: HttpResponse<IOrderInput[]>) => {
                this.orderInputs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderInputs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderInput) {
        return item.id;
    }

    registerChangeInOrderInputs() {
        this.eventSubscriber = this.eventManager.subscribe('orderInputListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
