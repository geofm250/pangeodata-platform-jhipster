import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIOrderReport } from 'app/shared/model/i-order-report.model';

@Component({
    selector: 'jhi-i-order-report-detail',
    templateUrl: './i-order-report-detail.component.html'
})
export class IOrderReportDetailComponent implements OnInit {
    iOrderReport: IIOrderReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iOrderReport }) => {
            this.iOrderReport = iOrderReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
