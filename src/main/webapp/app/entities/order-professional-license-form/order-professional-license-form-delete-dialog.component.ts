import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';
import { OrderProfessionalLicenseFormService } from './order-professional-license-form.service';

@Component({
    selector: 'jhi-order-professional-license-form-delete-dialog',
    templateUrl: './order-professional-license-form-delete-dialog.component.html'
})
export class OrderProfessionalLicenseFormDeleteDialogComponent {
    orderProfessionalLicenseForm: IOrderProfessionalLicenseForm;

    constructor(
        private orderProfessionalLicenseFormService: OrderProfessionalLicenseFormService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.orderProfessionalLicenseFormService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderProfessionalLicenseFormListModification',
                content: 'Deleted an orderProfessionalLicenseForm'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-professional-license-form-delete-popup',
    template: ''
})
export class OrderProfessionalLicenseFormDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderProfessionalLicenseForm }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderProfessionalLicenseFormDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderProfessionalLicenseForm = orderProfessionalLicenseForm;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
