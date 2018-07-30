import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmploymentReport } from 'app/shared/model/employment-report.model';

@Component({
    selector: 'jhi-employment-report-detail',
    templateUrl: './employment-report-detail.component.html'
})
export class EmploymentReportDetailComponent implements OnInit {
    employmentReport: IEmploymentReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employmentReport }) => {
            this.employmentReport = employmentReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
