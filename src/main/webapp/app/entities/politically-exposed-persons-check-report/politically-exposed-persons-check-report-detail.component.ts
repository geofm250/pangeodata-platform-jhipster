import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';

@Component({
    selector: 'jhi-politically-exposed-persons-check-report-detail',
    templateUrl: './politically-exposed-persons-check-report-detail.component.html'
})
export class PoliticallyExposedPersonsCheckReportDetailComponent implements OnInit {
    politicallyExposedPersonsCheckReport: IPoliticallyExposedPersonsCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ politicallyExposedPersonsCheckReport }) => {
            this.politicallyExposedPersonsCheckReport = politicallyExposedPersonsCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
