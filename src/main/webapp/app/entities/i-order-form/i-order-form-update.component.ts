import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IIOrderForm } from 'app/shared/model/i-order-form.model';
import { IOrderFormService } from './i-order-form.service';

@Component({
    selector: 'jhi-i-order-form-update',
    templateUrl: './i-order-form-update.component.html'
})
export class IOrderFormUpdateComponent implements OnInit {
    private _iOrderForm: IIOrderForm;
    isSaving: boolean;

    constructor(private iOrderFormService: IOrderFormService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ iOrderForm }) => {
            this.iOrderForm = iOrderForm;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.iOrderForm.id !== undefined) {
            this.subscribeToSaveResponse(this.iOrderFormService.update(this.iOrderForm));
        } else {
            this.subscribeToSaveResponse(this.iOrderFormService.create(this.iOrderForm));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIOrderForm>>) {
        result.subscribe((res: HttpResponse<IIOrderForm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get iOrderForm() {
        return this._iOrderForm;
    }

    set iOrderForm(iOrderForm: IIOrderForm) {
        this._iOrderForm = iOrderForm;
    }
}
