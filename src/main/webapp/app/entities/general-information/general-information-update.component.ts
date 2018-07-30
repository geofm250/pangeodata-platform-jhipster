import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGeneralInformation } from 'app/shared/model/general-information.model';
import { GeneralInformationService } from './general-information.service';

@Component({
    selector: 'jhi-general-information-update',
    templateUrl: './general-information-update.component.html'
})
export class GeneralInformationUpdateComponent implements OnInit {
    private _generalInformation: IGeneralInformation;
    isSaving: boolean;

    constructor(private generalInformationService: GeneralInformationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ generalInformation }) => {
            this.generalInformation = generalInformation;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.generalInformation.id !== undefined) {
            this.subscribeToSaveResponse(this.generalInformationService.update(this.generalInformation));
        } else {
            this.subscribeToSaveResponse(this.generalInformationService.create(this.generalInformation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGeneralInformation>>) {
        result.subscribe((res: HttpResponse<IGeneralInformation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get generalInformation() {
        return this._generalInformation;
    }

    set generalInformation(generalInformation: IGeneralInformation) {
        this._generalInformation = generalInformation;
    }
}
