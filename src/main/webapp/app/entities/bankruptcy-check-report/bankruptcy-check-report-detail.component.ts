import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';

@Component({
    selector: 'jhi-bankruptcy-check-report-detail',
    templateUrl: './bankruptcy-check-report-detail.component.html'
})
export class BankruptcyCheckReportDetailComponent implements OnInit {
    bankruptcyCheckReport: IBankruptcyCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bankruptcyCheckReport }) => {
            this.bankruptcyCheckReport = bankruptcyCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
