import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';

@Component({
    selector: 'jhi-social-media-check-report-detail',
    templateUrl: './social-media-check-report-detail.component.html'
})
export class SocialMediaCheckReportDetailComponent implements OnInit {
    socialMediaCheckReport: ISocialMediaCheckReport;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ socialMediaCheckReport }) => {
            this.socialMediaCheckReport = socialMediaCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }
}
