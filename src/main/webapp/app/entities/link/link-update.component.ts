import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILink } from 'app/shared/model/link.model';
import { LinkService } from './link.service';

@Component({
    selector: 'jhi-link-update',
    templateUrl: './link-update.component.html'
})
export class LinkUpdateComponent implements OnInit {
    private _link: ILink;
    isSaving: boolean;

    constructor(private linkService: LinkService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ link }) => {
            this.link = link;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.link.id !== undefined) {
            this.subscribeToSaveResponse(this.linkService.update(this.link));
        } else {
            this.subscribeToSaveResponse(this.linkService.create(this.link));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILink>>) {
        result.subscribe((res: HttpResponse<ILink>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get link() {
        return this._link;
    }

    set link(link: ILink) {
        this._link = link;
    }
}
