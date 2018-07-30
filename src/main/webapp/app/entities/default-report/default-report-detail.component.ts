import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDefaultReport } from 'app/shared/model/default-report.model';

@Component({
    selector: 'jhi-default-report-detail',
    templateUrl: './default-report-detail.component.html'
})
export class DefaultReportDetailComponent implements OnInit {
    defaultReport: IDefaultReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defaultReport }) => {
            this.defaultReport = defaultReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
