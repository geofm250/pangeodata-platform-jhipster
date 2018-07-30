import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOffence } from 'app/shared/model/offence.model';
import { OffenceService } from './offence.service';

@Component({
    selector: 'jhi-offence-update',
    templateUrl: './offence-update.component.html'
})
export class OffenceUpdateComponent implements OnInit {
    private _offence: IOffence;
    isSaving: boolean;

    constructor(private offenceService: OffenceService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ offence }) => {
            this.offence = offence;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.offence.id !== undefined) {
            this.subscribeToSaveResponse(this.offenceService.update(this.offence));
        } else {
            this.subscribeToSaveResponse(this.offenceService.create(this.offence));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOffence>>) {
        result.subscribe((res: HttpResponse<IOffence>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get offence() {
        return this._offence;
    }

    set offence(offence: IOffence) {
        this._offence = offence;
    }
}
