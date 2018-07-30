import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRequirement } from 'app/shared/model/requirement.model';
import { RequirementService } from './requirement.service';

@Component({
    selector: 'jhi-requirement-update',
    templateUrl: './requirement-update.component.html'
})
export class RequirementUpdateComponent implements OnInit {
    private _requirement: IRequirement;
    isSaving: boolean;

    constructor(private requirementService: RequirementService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ requirement }) => {
            this.requirement = requirement;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.requirement.id !== undefined) {
            this.subscribeToSaveResponse(this.requirementService.update(this.requirement));
        } else {
            this.subscribeToSaveResponse(this.requirementService.create(this.requirement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRequirement>>) {
        result.subscribe((res: HttpResponse<IRequirement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get requirement() {
        return this._requirement;
    }

    set requirement(requirement: IRequirement) {
        this._requirement = requirement;
    }
}
