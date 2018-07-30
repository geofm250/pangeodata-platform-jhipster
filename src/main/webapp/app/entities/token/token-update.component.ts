import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IToken } from 'app/shared/model/token.model';
import { TokenService } from './token.service';

@Component({
    selector: 'jhi-token-update',
    templateUrl: './token-update.component.html'
})
export class TokenUpdateComponent implements OnInit {
    private _token: IToken;
    isSaving: boolean;

    constructor(private tokenService: TokenService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ token }) => {
            this.token = token;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.token.id !== undefined) {
            this.subscribeToSaveResponse(this.tokenService.update(this.token));
        } else {
            this.subscribeToSaveResponse(this.tokenService.create(this.token));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IToken>>) {
        result.subscribe((res: HttpResponse<IToken>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get token() {
        return this._token;
    }

    set token(token: IToken) {
        this._token = token;
    }
}
