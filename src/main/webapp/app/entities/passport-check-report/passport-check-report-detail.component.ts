import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPassportCheckReport } from 'app/shared/model/passport-check-report.model';

@Component({
    selector: 'jhi-passport-check-report-detail',
    templateUrl: './passport-check-report-detail.component.html'
})
export class PassportCheckReportDetailComponent implements OnInit {
    passportCheckReport: IPassportCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ passportCheckReport }) => {
            this.passportCheckReport = passportCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
