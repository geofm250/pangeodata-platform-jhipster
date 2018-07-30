import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICriminalRecordReport } from 'app/shared/model/criminal-record-report.model';

@Component({
    selector: 'jhi-criminal-record-report-detail',
    templateUrl: './criminal-record-report-detail.component.html'
})
export class CriminalRecordReportDetailComponent implements OnInit {
    criminalRecordReport: ICriminalRecordReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ criminalRecordReport }) => {
            this.criminalRecordReport = criminalRecordReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
