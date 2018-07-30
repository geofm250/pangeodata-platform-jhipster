import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';
import { OrderProfessionalLicenseFormService } from './order-professional-license-form.service';

@Component({
    selector: 'jhi-order-professional-license-form-update',
    templateUrl: './order-professional-license-form-update.component.html'
})
export class OrderProfessionalLicenseFormUpdateComponent implements OnInit {
    private _orderProfessionalLicenseForm: IOrderProfessionalLicenseForm;
    isSaving: boolean;

    constructor(private orderProfessionalLicenseFormService: OrderProfessionalLicenseFormService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderProfessionalLicenseForm }) => {
            this.orderProfessionalLicenseForm = orderProfessionalLicenseForm;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderProfessionalLicenseForm.id !== undefined) {
            this.subscribeToSaveResponse(this.orderProfessionalLicenseFormService.update(this.orderProfessionalLicenseForm));
        } else {
            this.subscribeToSaveResponse(this.orderProfessionalLicenseFormService.create(this.orderProfessionalLicenseForm));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderProfessionalLicenseForm>>) {
        result.subscribe(
            (res: HttpResponse<IOrderProfessionalLicenseForm>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get orderProfessionalLicenseForm() {
        return this._orderProfessionalLicenseForm;
    }

    set orderProfessionalLicenseForm(orderProfessionalLicenseForm: IOrderProfessionalLicenseForm) {
        this._orderProfessionalLicenseForm = orderProfessionalLicenseForm;
    }
}
