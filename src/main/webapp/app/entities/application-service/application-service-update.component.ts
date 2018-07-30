import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IApplicationService } from 'app/shared/model/application-service.model';
import { ApplicationServiceService } from './application-service.service';

@Component({
    selector: 'jhi-application-service-update',
    templateUrl: './application-service-update.component.html'
})
export class ApplicationServiceUpdateComponent implements OnInit {
    private _applicationService: IApplicationService;
    isSaving: boolean;

    constructor(private applicationServiceService: ApplicationServiceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ applicationService }) => {
            this.applicationService = applicationService;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.applicationService.id !== undefined) {
            this.subscribeToSaveResponse(this.applicationServiceService.update(this.applicationService));
        } else {
            this.subscribeToSaveResponse(this.applicationServiceService.create(this.applicationService));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IApplicationService>>) {
        result.subscribe((res: HttpResponse<IApplicationService>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get applicationService() {
        return this._applicationService;
    }

    set applicationService(applicationService: IApplicationService) {
        this._applicationService = applicationService;
    }
}
