import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';
import { Principal } from 'app/core';
import { SocialMediaCheckReportService } from './social-media-check-report.service';

@Component({
    selector: 'jhi-social-media-check-report',
    templateUrl: './social-media-check-report.component.html'
})
export class SocialMediaCheckReportComponent implements OnInit, OnDestroy {
    socialMediaCheckReports: ISocialMediaCheckReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private socialMediaCheckReportService: SocialMediaCheckReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.socialMediaCheckReportService.query().subscribe(
            (res: HttpResponse<ISocialMediaCheckReport[]>) => {
                this.socialMediaCheckReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSocialMediaCheckReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISocialMediaCheckReport) {
        return item.id;
    }

    registerChangeInSocialMediaCheckReports() {
        this.eventSubscriber = this.eventManager.subscribe('socialMediaCheckReportListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
