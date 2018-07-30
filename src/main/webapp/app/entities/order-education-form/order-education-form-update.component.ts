import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrderEducationForm } from 'app/shared/model/order-education-form.model';
import { OrderEducationFormService } from './order-education-form.service';

@Component({
    selector: 'jhi-order-education-form-update',
    templateUrl: './order-education-form-update.component.html'
})
export class OrderEducationFormUpdateComponent implements OnInit {
    private _orderEducationForm: IOrderEducationForm;
    isSaving: boolean;

    constructor(private orderEducationFormService: OrderEducationFormService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderEducationForm }) => {
            this.orderEducationForm = orderEducationForm;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderEducationForm.id !== undefined) {
            this.subscribeToSaveResponse(this.orderEducationFormService.update(this.orderEducationForm));
        } else {
            this.subscribeToSaveResponse(this.orderEducationFormService.create(this.orderEducationForm));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderEducationForm>>) {
        result.subscribe((res: HttpResponse<IOrderEducationForm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get orderEducationForm() {
        return this._orderEducationForm;
    }

    set orderEducationForm(orderEducationForm: IOrderEducationForm) {
        this._orderEducationForm = orderEducationForm;
    }
}
