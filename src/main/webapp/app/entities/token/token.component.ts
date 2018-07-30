import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IToken } from 'app/shared/model/token.model';
import { Principal } from 'app/core';
import { TokenService } from './token.service';

@Component({
    selector: 'jhi-token',
    templateUrl: './token.component.html'
})
export class TokenComponent implements OnInit, OnDestroy {
    tokens: IToken[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tokenService: TokenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tokenService.query().subscribe(
            (res: HttpResponse<IToken[]>) => {
                this.tokens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTokens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IToken) {
        return item.id;
    }

    registerChangeInTokens() {
        this.eventSubscriber = this.eventManager.subscribe('tokenListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
