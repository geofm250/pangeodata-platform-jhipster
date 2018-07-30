import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICustomUser } from 'app/shared/model/custom-user.model';
import { Principal } from 'app/core';
import { CustomUserService } from './custom-user.service';

@Component({
    selector: 'jhi-custom-user',
    templateUrl: './custom-user.component.html'
})
export class CustomUserComponent implements OnInit, OnDestroy {
    customUsers: ICustomUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customUserService: CustomUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.customUserService.query().subscribe(
            (res: HttpResponse<ICustomUser[]>) => {
                this.customUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICustomUser) {
        return item.id;
    }

    registerChangeInCustomUsers() {
        this.eventSubscriber = this.eventManager.subscribe('customUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
