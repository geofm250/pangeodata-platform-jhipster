import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';

@Component({
    selector: 'jhi-drivers-license-check-report-detail',
    templateUrl: './drivers-license-check-report-detail.component.html'
})
export class DriversLicenseCheckReportDetailComponent implements OnInit {
    driversLicenseCheckReport: IDriversLicenseCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ driversLicenseCheckReport }) => {
            this.driversLicenseCheckReport = driversLicenseCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
