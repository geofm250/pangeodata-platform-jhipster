import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';

@Component({
    selector: 'jhi-reported-criminal-activity-check-detail',
    templateUrl: './reported-criminal-activity-check-detail.component.html'
})
export class ReportedCriminalActivityCheckDetailComponent implements OnInit {
    reportedCriminalActivityCheck: IReportedCriminalActivityCheck;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reportedCriminalActivityCheck }) => {
            this.reportedCriminalActivityCheck = reportedCriminalActivityCheck;
        });
    }

    previousState() {
        window.history.back();
    }
}
