import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILicenseCheckReport } from 'app/shared/model/license-check-report.model';

@Component({
    selector: 'jhi-license-check-report-detail',
    templateUrl: './license-check-report-detail.component.html'
})
export class LicenseCheckReportDetailComponent implements OnInit {
    licenseCheckReport: ILicenseCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ licenseCheckReport }) => {
            this.licenseCheckReport = licenseCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
