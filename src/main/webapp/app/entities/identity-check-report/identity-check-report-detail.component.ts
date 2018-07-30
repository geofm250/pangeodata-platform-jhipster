import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIdentityCheckReport } from 'app/shared/model/identity-check-report.model';

@Component({
    selector: 'jhi-identity-check-report-detail',
    templateUrl: './identity-check-report-detail.component.html'
})
export class IdentityCheckReportDetailComponent implements OnInit {
    identityCheckReport: IIdentityCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ identityCheckReport }) => {
            this.identityCheckReport = identityCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
