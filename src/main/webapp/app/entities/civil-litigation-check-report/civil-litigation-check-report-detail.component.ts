import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';

@Component({
    selector: 'jhi-civil-litigation-check-report-detail',
    templateUrl: './civil-litigation-check-report-detail.component.html'
})
export class CivilLitigationCheckReportDetailComponent implements OnInit {
    civilLitigationCheckReport: ICivilLitigationCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ civilLitigationCheckReport }) => {
            this.civilLitigationCheckReport = civilLitigationCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
