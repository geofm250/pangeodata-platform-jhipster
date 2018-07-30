import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderFile } from 'app/shared/model/order-file.model';
import { Principal } from 'app/core';
import { OrderFileService } from './order-file.service';

@Component({
    selector: 'jhi-order-file',
    templateUrl: './order-file.component.html'
})
export class OrderFileComponent implements OnInit, OnDestroy {
    orderFiles: IOrderFile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderFileService: OrderFileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderFileService.query().subscribe(
            (res: HttpResponse<IOrderFile[]>) => {
                this.orderFiles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderFiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderFile) {
        return item.id;
    }

    registerChangeInOrderFiles() {
        this.eventSubscriber = this.eventManager.subscribe('orderFileListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
