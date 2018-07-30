import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';

@Component({
    selector: 'jhi-local-language-media-check-report-detail',
    templateUrl: './local-language-media-check-report-detail.component.html'
})
export class LocalLanguageMediaCheckReportDetailComponent implements OnInit {
    localLanguageMediaCheckReport: ILocalLanguageMediaCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ localLanguageMediaCheckReport }) => {
            this.localLanguageMediaCheckReport = localLanguageMediaCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
