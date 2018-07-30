import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';
import { Principal } from 'app/core';
import { OrderProfessionalLicenseFormService } from './order-professional-license-form.service';

@Component({
    selector: 'jhi-order-professional-license-form',
    templateUrl: './order-professional-license-form.component.html'
})
export class OrderProfessionalLicenseFormComponent implements OnInit, OnDestroy {
    orderProfessionalLicenseForms: IOrderProfessionalLicenseForm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderProfessionalLicenseFormService: OrderProfessionalLicenseFormService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderProfessionalLicenseFormService.query().subscribe(
            (res: HttpResponse<IOrderProfessionalLicenseForm[]>) => {
                this.orderProfessionalLicenseForms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderProfessionalLicenseForms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderProfessionalLicenseForm) {
        return item.id;
    }

    registerChangeInOrderProfessionalLicenseForms() {
        this.eventSubscriber = this.eventManager.subscribe('orderProfessionalLicenseFormListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
