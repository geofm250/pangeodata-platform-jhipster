import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';
import { SocialMediaCheckReportService } from './social-media-check-report.service';

@Component({
    selector: 'jhi-social-media-check-report-update',
    templateUrl: './social-media-check-report-update.component.html'
})
export class SocialMediaCheckReportUpdateComponent implements OnInit {
    private _socialMediaCheckReport: ISocialMediaCheckReport;
    isSaving: boolean;

    constructor(private socialMediaCheckReportService: SocialMediaCheckReportService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ socialMediaCheckReport }) => {
            this.socialMediaCheckReport = socialMediaCheckReport;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.socialMediaCheckReport.id !== undefined) {
            this.subscribeToSaveResponse(this.socialMediaCheckReportService.update(this.socialMediaCheckReport));
        } else {
            this.subscribeToSaveResponse(this.socialMediaCheckReportService.create(this.socialMediaCheckReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISocialMediaCheckReport>>) {
        result.subscribe(
            (res: HttpResponse<ISocialMediaCheckReport>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get socialMediaCheckReport() {
        return this._socialMediaCheckReport;
    }

    set socialMediaCheckReport(socialMediaCheckReport: ISocialMediaCheckReport) {
        this._socialMediaCheckReport = socialMediaCheckReport;
    }
}
