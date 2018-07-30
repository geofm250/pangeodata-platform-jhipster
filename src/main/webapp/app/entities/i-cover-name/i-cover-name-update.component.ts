import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IICoverName } from 'app/shared/model/i-cover-name.model';
import { ICoverNameService } from './i-cover-name.service';

@Component({
    selector: 'jhi-i-cover-name-update',
    templateUrl: './i-cover-name-update.component.html'
})
export class ICoverNameUpdateComponent implements OnInit {
    private _iCoverName: IICoverName;
    isSaving: boolean;

    constructor(private iCoverNameService: ICoverNameService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ iCoverName }) => {
            this.iCoverName = iCoverName;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.iCoverName.id !== undefined) {
            this.subscribeToSaveResponse(this.iCoverNameService.update(this.iCoverName));
        } else {
            this.subscribeToSaveResponse(this.iCoverNameService.create(this.iCoverName));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IICoverName>>) {
        result.subscribe((res: HttpResponse<IICoverName>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get iCoverName() {
        return this._iCoverName;
    }

    set iCoverName(iCoverName: IICoverName) {
        this._iCoverName = iCoverName;
    }
}
