import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISession } from 'app/shared/model/session.model';
import { SessionService } from './session.service';

@Component({
    selector: 'jhi-session-update',
    templateUrl: './session-update.component.html'
})
export class SessionUpdateComponent implements OnInit {
    private _session: ISession;
    isSaving: boolean;

    constructor(private sessionService: SessionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ session }) => {
            this.session = session;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.session.id !== undefined) {
            this.subscribeToSaveResponse(this.sessionService.update(this.session));
        } else {
            this.subscribeToSaveResponse(this.sessionService.create(this.session));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISession>>) {
        result.subscribe((res: HttpResponse<ISession>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get session() {
        return this._session;
    }

    set session(session: ISession) {
        this._session = session;
    }
}
