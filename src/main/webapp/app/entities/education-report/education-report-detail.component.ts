import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEducationReport } from 'app/shared/model/education-report.model';

@Component({
    selector: 'jhi-education-report-detail',
    templateUrl: './education-report-detail.component.html'
})
export class EducationReportDetailComponent implements OnInit {
    educationReport: IEducationReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ educationReport }) => {
            this.educationReport = educationReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
