import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderEducationForm } from 'app/shared/model/order-education-form.model';
import { Principal } from 'app/core';
import { OrderEducationFormService } from './order-education-form.service';

@Component({
    selector: 'jhi-order-education-form',
    templateUrl: './order-education-form.component.html'
})
export class OrderEducationFormComponent implements OnInit, OnDestroy {
    orderEducationForms: IOrderEducationForm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderEducationFormService: OrderEducationFormService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderEducationFormService.query().subscribe(
            (res: HttpResponse<IOrderEducationForm[]>) => {
                this.orderEducationForms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderEducationForms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderEducationForm) {
        return item.id;
    }

    registerChangeInOrderEducationForms() {
        this.eventSubscriber = this.eventManager.subscribe('orderEducationFormListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
