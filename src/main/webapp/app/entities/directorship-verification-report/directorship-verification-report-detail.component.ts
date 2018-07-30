import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';

@Component({
    selector: 'jhi-directorship-verification-report-detail',
    templateUrl: './directorship-verification-report-detail.component.html'
})
export class DirectorshipVerificationReportDetailComponent implements OnInit {
    directorshipVerificationReport: IDirectorshipVerificationReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ directorshipVerificationReport }) => {
            this.directorshipVerificationReport = directorshipVerificationReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
