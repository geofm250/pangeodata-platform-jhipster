import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICreditCheckReport } from 'app/shared/model/credit-check-report.model';

@Component({
    selector: 'jhi-credit-check-report-detail',
    templateUrl: './credit-check-report-detail.component.html'
})
export class CreditCheckReportDetailComponent implements OnInit {
    creditCheckReport: ICreditCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ creditCheckReport }) => {
            this.creditCheckReport = creditCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
