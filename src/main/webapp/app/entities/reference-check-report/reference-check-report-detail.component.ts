import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReferenceCheckReport } from 'app/shared/model/reference-check-report.model';

@Component({
    selector: 'jhi-reference-check-report-detail',
    templateUrl: './reference-check-report-detail.component.html'
})
export class ReferenceCheckReportDetailComponent implements OnInit {
    referenceCheckReport: IReferenceCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ referenceCheckReport }) => {
            this.referenceCheckReport = referenceCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
