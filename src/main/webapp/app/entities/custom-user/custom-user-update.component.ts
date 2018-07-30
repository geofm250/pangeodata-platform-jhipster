import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICustomUser } from 'app/shared/model/custom-user.model';
import { CustomUserService } from './custom-user.service';

@Component({
    selector: 'jhi-custom-user-update',
    templateUrl: './custom-user-update.component.html'
})
export class CustomUserUpdateComponent implements OnInit {
    private _customUser: ICustomUser;
    isSaving: boolean;

    constructor(private customUserService: CustomUserService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customUser }) => {
            this.customUser = customUser;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.customUser.id !== undefined) {
            this.subscribeToSaveResponse(this.customUserService.update(this.customUser));
        } else {
            this.subscribeToSaveResponse(this.customUserService.create(this.customUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomUser>>) {
        result.subscribe((res: HttpResponse<ICustomUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get customUser() {
        return this._customUser;
    }

    set customUser(customUser: ICustomUser) {
        this._customUser = customUser;
    }
}
