import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderEmploymentForm } from 'app/shared/model/order-employment-form.model';
import { OrderEmploymentFormService } from './order-employment-form.service';

@Component({
    selector: 'jhi-order-employment-form-delete-dialog',
    templateUrl: './order-employment-form-delete-dialog.component.html'
})
export class OrderEmploymentFormDeleteDialogComponent {
    orderEmploymentForm: IOrderEmploymentForm;

    constructor(
        private orderEmploymentFormService: OrderEmploymentFormService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.orderEmploymentFormService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderEmploymentFormListModification',
                content: 'Deleted an orderEmploymentForm'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-employment-form-delete-popup',
    template: ''
})
export class OrderEmploymentFormDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderEmploymentForm }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderEmploymentFormDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderEmploymentForm = orderEmploymentForm;
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
