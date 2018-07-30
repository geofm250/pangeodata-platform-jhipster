import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IICoverName } from 'app/shared/model/i-cover-name.model';
import { Principal } from 'app/core';
import { ICoverNameService } from './i-cover-name.service';

@Component({
    selector: 'jhi-i-cover-name',
    templateUrl: './i-cover-name.component.html'
})
export class ICoverNameComponent implements OnInit, OnDestroy {
    iCoverNames: IICoverName[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private iCoverNameService: ICoverNameService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.iCoverNameService.query().subscribe(
            (res: HttpResponse<IICoverName[]>) => {
                this.iCoverNames = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInICoverNames();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IICoverName) {
        return item.id;
    }

    registerChangeInICoverNames() {
        this.eventSubscriber = this.eventManager.subscribe('iCoverNameListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
